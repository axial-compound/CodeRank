const stream = require('stream');
const Dockerode = require('dockerode');
const docker = new Dockerode();

const runCode = async (req, res) => {
  try {
    const language = req.params.language;
    const codeBody = req.body;

    if (!codeBody ||!language) {
      res.status(404).json({ message: "Language or Code Body is missing" });
    }

    let output = "";
    let error = "";

    const dockerImages = {
      python: "python-compiler",
      cpp: "cpp-compiler",
      java: "java-env",
    };

    const dockerCommands = {
      python: ["python", "-c"],
      cpp: ["sh", "-c", "g++ -o my_cpp_program -xc++ - &&./my_cpp_program"],
      java: [
        "sh",
        "-c",
        'echo "$1" > Main.java && javac Main.java && java Main',
      ],
    };

    const image = dockerImages[language];
    const command = dockerCommands[language];

    const container = await docker.run(
      image,
      command,
      { codeBody },
      (process.stdin, process.stdout, process.stderr)
    );

    await new Promise((resolve, reject) => {
      container.wait((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const inspectData = await container.inspect();

    output = inspectData.State.Running
     ? "Code executed successfully"
      : "Code execution failed";

    if (inspectData.State.ExitCode!== 0) {
      error = `Process exited with code ${inspectData.State.ExitCode}`;
    }

    const timestamp = new Date().toISOString();

    const response_data = {
      output: output,
      error: error,
      execution_info: `Code executed at ${timestamp}`,
    };

    return response_data;
  } catch (error) {
    console.log("Error executing code", error);
    throw error;
  }
};

module.exports = { runCode };
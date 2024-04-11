const Dockerode = require('dockerode');
const docker = new Dockerode();

const getDockerImage = (language) => {
  switch (language) {
    case 'python':
      return 'python-compiler';
    case 'cpp':
      return 'cpp-compiler';
    case 'java':
      return 'java-compiler';
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

const runCode = async (req, res) => {
  try {
    const language = req.params.language;
    const codeBody = req.body.codeBody;

    if (!codeBody || !language) {
      return res.status(400).json({ message: "Language or Code Body is missing" });
    }

    console.log(codeBody, language);

    const image = getDockerImage(language);

    let container;
    if (language === 'python') {
      container = await docker.createContainer({
        Image: image,
        Tty: true,
        AttachStdin: true,
        Cmd: ['/bin/bash', '-c', `echo "${codeBody}" | ${language}`],
      });
    } else if (language === 'cpp') {
      container = await docker.createContainer({
        Image: image,
        Tty: true,
        AttachStdin: true,
        Cmd: ['/bin/bash', '-c', `echo "${codeBody.replace(/"/g, '\\"')}" > main.cpp && g++ -o main main.cpp && ./main`],
      });
    } else if (language === 'java') {
      container = await docker.createContainer({
        Image: image,
        Tty: true,
        AttachStdin: true,
        Cmd: ['/bin/bash', '-c', `echo "${codeBody.replace(/"/g, '\\"')}" > Main.java && javac Main.java && java Main`],
      });
    }

    await container.start();

    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });

    let output = '';

    logs.on('data', function (data) {
      output += data; // Accumulate the output data
      console.log(data);
    });

    await new Promise((resolve, reject) => {
      logs.on('end', resolve);
      logs.on('error', reject);
    });

    await container.remove();

    res.status(200).json({ output }); // Send the output back in the response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { runCode };

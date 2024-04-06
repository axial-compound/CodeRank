const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

// Maximum number of containers per language
const MAX_CONTAINERS = 5;

// Pool of containers for each language
const containerPools = {
  javascript: [],
  typescript: [],
  python: [],
  java: [],
  cpp: [],
  c: [],
};

// Function to run code in a Docker container
const runCodeInContainer = async (language, codeBody) => {
  try {
    console.log(language);
    
    const escapedCodeBody = codeBody.replace(/'/g, "'\\''");

    // Create a new container from the appropriate compiler image
    const { stdout, stderr } = await execAsync(
      `docker run --rm -i cpp-compiler /bin/bash -c '${escapedCodeBody}'`
    );

    if (stderr) {
      throw new Error(stderr);
    }

    return stdout;
  } catch (error) {
    console.error(`Error running ${language} code:`, error);
    throw new Error("Internal server error");
  }
};

// Function to run JavaScript code
const runJavaScript = async (req, res) => {
  const { codeBody } = req.body;
  try {
    const output = await runCodeInContainer("nodejs", codeBody);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Error running JavaScript code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to run JavaScript code
const runTypeScript = async (req, res) => {
  const { codeBody } = req.body;
  try {
    const output = await runCodeInContainer("nodejs", codeBody);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Error running JavaScript code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to run JavaScript code
const runPython = async (req, res) => {
  const { codeBody } = req.body;
  try {
    const output = await runCodeInContainer("python", codeBody);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Error running JavaScript code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to run JavaScript code
const runCpp = async (req, res) => {
  const { codeBody } = req.body;
  try {
    const output = await runCodeInContainer("cpp", codeBody);
    res.status(200).json({ output });
  } catch (error) {
    console.error(`Error running Cpp code:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to run JavaScript code
const runJava = async (req, res) => {
  const { codeBody } = req.body;
  try {
    const output = await runCodeInContainer("java", codeBody);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Error running JavaScript code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  runJavaScript,
  runTypeScript,
  runCpp,
  runJava,
  runPython,
};

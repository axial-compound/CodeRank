const { exec } = require('child_process');
const util = require('util');
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
    c: []
};

// Function to run code in a Docker container
const runCodeInContainer = async (language, codeBody) => {
    // Check if there are available containers in the pool
    if (containerPools[language].length < MAX_CONTAINERS) {
        // If there are available containers, reuse one
        const container = containerPools[language].pop();
        return new Promise((resolve, reject) => {
            exec(`docker exec -i ${container} /bin/bash -c '${codeBody}'`, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        }).finally(() => {
            // Return the container to the pool
            containerPools[language].push(container);
        });
    } else {
        // If all containers are in use, wait and try again
        await new Promise(resolve => setTimeout(resolve, 1000));
        return runCodeInContainer(language, codeBody);
    }
};

// Function to run JavaScript code
const runJavaScript = async (req, res) => {
    const { codeBody } = req.body;
    try {
        const output = await runCodeInContainer('javascript', codeBody);
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
        const output = await runCodeInContainer('javascript', codeBody);
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
        const output = await runCodeInContainer('javascript', codeBody);
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
        const output = await runCodeInContainer('javascript', codeBody);
        res.status(200).json({ output });
    } catch (error) {
        console.error("Error running JavaScript code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Function to run JavaScript code
const runJava = async (req, res) => {
    const { codeBody } = req.body;
    try {
        const output = await runCodeInContainer('javascript', codeBody);
        res.status(200).json({ output });
    } catch (error) {
        console.error("Error running JavaScript code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Function to run JavaScript code
const runC = async (req, res) => {
    const { codeBody } = req.body;
    try {
        const output = await runCodeInContainer('javascript', codeBody);
        res.status(200).json({ output });
    } catch (error) {
        console.error("Error running JavaScript code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {runJavaScript,runTypeScript,runCpp, runJava, runC,runPython};
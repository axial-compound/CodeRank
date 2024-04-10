const { spawn } = require('child_process');

const runCodeBody = async (codeBody, language) => {
    try {
        let output = '';
        let error = '';

        // Define the docker run command based on the language
        let command;
        if (language === 'python') {
            command = ['docker', 'run', '--rm', '-i', 'python-env', 'python', '-c', codeBody];
        } else if (language === 'cpp') {
            command = ['docker', 'run', '--rm', '-i', 'cpp-env', 'sh', '-c', 'g++ -o my_cpp_program -xc++ - && ./my_cpp_program'];
        } else if (language === 'java') {
            command = ['docker', 'run', '--rm', '-i', 'java-env', 'sh', '-c', 'echo "$1" > Main.java && javac Main.java && java Main'];
        } else {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Execute the docker run command
        const child = spawn(command[0], command.slice(1), { shell: true });

        // Handle stdout and stderr streams
        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            error += data.toString();
        });

        // Handle process exit
        await new Promise((resolve, reject) => {
            child.on('close', (code) => {
                if (code !== 0) {
                    error += `Process exited with code ${code}`;
                }
                resolve();
            });

            child.on('error', (err) => {
                error += `Error: ${err.message}`;
                resolve();
            });
        });

        const timestamp = new Date().toISOString();

        const response_data = {
            output: output,
            error: error,
            execution_info: `Code executed at ${timestamp}`,
        };

        return response_data;
    } catch (error) {
        throw error;
    }
};

module.exports = { runCodeBody };

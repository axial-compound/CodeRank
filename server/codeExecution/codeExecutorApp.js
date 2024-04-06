const express = require('express');
const bodyParser = require('body-parser');
const authCheck = require('./middleware/authCheckMiddleware');
const codeController = require('./controller/codeController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
const port = 8000;

// Dynamic route to handle language parameter
app.post('/run/:language', authCheck, (req, res) => {
    const { language } = req.params;
    switch (language) {
        case 'javascript':
            codeController.runJavaScript(req, res);
            break;
        case 'typescript':
            codeController.runTypeScript(req, res);
            break;
        case 'python':
            codeController.runPython(req, res);
            break;
        case 'java':
            codeController.runJava(req, res);
            break;
        case 'cpp':
            codeController.runCpp(req, res);
            break;
        default:
            res.status(400).json({ error: 'Unsupported language' });
    }
});

app.listen(port, () => {
    console.log(`Code-Executor server is running on Port ${port}`);
});

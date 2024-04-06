const express = require('express');
const bodyParser = require('body-parser');
const authCheck = require('./middleware/authCheckMiddleware');
const codeController = require('./controller/codeController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
const port = 8000;


app.post('/run/javascript', authCheck, codeController.runJavaScript);

app.post('/run/typescript', authCheck, codeController.runTypeScript);

app.post('/run/python', authCheck, codeController.runPython);

app.post('/run/java', authCheck, codeController.runJava);

app.post('/run/cpp', authCheck, codeController.runCpp);

app.post('/run/c', authCheck, codeController.runC);

app.listen(port, () => {
    console.log(`Code-Executor server is running on Port ${port}`);
});

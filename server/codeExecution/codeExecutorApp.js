const express = require('express');
const bodyParser = require('body-parser');
const authCheck = require('./middleware/authCheckMiddleware');
const routes = require('./routes/routes');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
const port = 8000;

// routes
app.use("/",authCheck,routes);

app.listen(port, () => {
    console.log(`Code-Executor server is running on Port ${port}`);
});

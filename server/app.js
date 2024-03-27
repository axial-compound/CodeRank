const express = require('express');
const mongoConn = require('./database/connection');
const app = express();

require('dotenv').config();

app.use(express.json()); // for parsing application/json
const port = 3000;

app.use();


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});

//MongoDB connection
mongoConn.on('error', console.error.bind(console, 'Connection error:'));

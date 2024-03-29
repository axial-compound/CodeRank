const express = require('express');
const bodyParser = require('body-parser');
const {client} = require('./database/connection')
const userRoutes = require('./APIs/routes/userRoutes');
const unAuthRoutes = require('./APIs/routes/unAuthRoutes');
const authMiddlewarefunc = require('./middleware/authMiddleware');
const app = express();

require('dotenv').config();

//app.use(express.json()); // for parsing application/json
app.use(bodyParser.json());
const port = 3000;

//routes
app.use('/user',authMiddlewarefunc,userRoutes);
app.use('/',unAuthRoutes);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});

//MongoDB connection
client.catch(error => {
    console.error(error);
});
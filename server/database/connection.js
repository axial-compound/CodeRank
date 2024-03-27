const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() =>{
    console.log("MongoDB connected");
}).catch((err) =>{
    console.error("MongoDB connection Failed",err);
});

module.exports = mongoose.connection;
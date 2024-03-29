const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = mongoose.connect(uri);

client.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports = {client};
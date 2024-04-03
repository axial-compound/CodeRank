
const { S3Client , ListBucketsCommand , GetObjectCommand , PutObjectCommand} = require('@aws-sdk/client-s3');

//load the dotenv 
require('dotenv').config();

const access_key = process.env.ACCESS_KEY;
const key = process.env.SECRET_ACCESS_KEY;

//define the region, bucket and credentials

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: access_key,
        secretAccessKey: key

    }
});

module.exports = {s3Client , ListBucketsCommand , GetObjectCommand , PutObjectCommand};


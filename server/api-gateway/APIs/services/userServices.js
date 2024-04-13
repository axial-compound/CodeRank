const express = require("express");
const bcrypt = require("bcrypt");
const USER = require("../../models/userModel");
const CODE = require("../../models/codeModel");

const crypto = require("crypto");

//ENV file
require('dotenv').config();

const aws_url = process.env.AWS_BUCKET; // Bucket URL

//AWS  S3 Bucket
const {
  s3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("../../config/awsConfig");

//------------------------------------------------------------XX create a unique key based on userid and codeBody  XX-----------------------------------------------------------
const generateUniqueKey = async (userId, codeBody) => {
  let hash = crypto.createHash("sha256").update(codeBody).digest("hex");

  //combine the hash with userid  to make it unique
  const uniqueKey = `${userId}_${hash}`;

  return uniqueKey;
};

//------------------------------------------------------------XX Register User  XX-----------------------------------------------------------
const registerUser = async (email, name, password) => {
  try {
    // Check if the email already exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      throw new Error("Email already exists");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new USER({
      email: email,
      name: name,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

//------------------------------------------------------------XX Authenticate User  XX-----------------------------------------------------------
const authenticateUser = async (email, password) => {
  try {
    const user = await USER.findOne({ email });

    if (!user && (await bcrypt.compare(password, user.password))) {
      throw new error("Invalid email and password");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

//only for checking

const getusers = async (id) => {
  const user = await USER.findById(id);

  if (!user) {
    throw new Error("No user found!"); //error res is not defined
  }
  return user;
};

//------------------------------------------------------------XX Code Submit  XX-----------------------------------------------------------
const codeSubmit = async (name, codeBody, codeLanguage, userId) => {
  try {
    const uniqueKey = await generateUniqueKey(userId, codeBody);

    const codeurl = `${aws_url}${uniqueKey}`;

    console.log(codeurl);

    //check if code exist in database with same user and body
    const existingCode = await CODE.findOne({
      userReference: userId,
      codeBodyURL: codeurl,
    });

    if (existingCode) {
      return {
        msg: "Code Exists",
        name: existingCode.name,
        link: existingCode.codeBodyURL,
      };
    } else {
      const putObjectParams = {
        Bucket: "coderank-codes",
        Key: uniqueKey,
        Body: codeBody,
      };

      await s3Client.send(new PutObjectCommand(putObjectParams));

      const newCode = new CODE({
        name: name,
        codeBodyURL: codeurl,
        codeLanguage: codeLanguage,
        userReference: userId,
      });

      await newCode.save();

      return newCode;
    }
  } catch (error) {
    throw new Error(error);
  }
};

//------------------------------------------------------------XX  S3 codeBody of specific codeUrl  XX-----------------------------------------------------------

const s3CodeBody = async (url) => {
  try {
    // Extract the key from the URL
    const key = url.split(aws_url)[1]; // Assuming aws_url is the base URL of your S3 bucket

    // Construct the parameters for the getObject operation
    const getObjectParams = {
      Bucket: "coderank-codes", // Your S3 bucket name
      Key: key, // The key (filename) of the object
    };

    // Retrieve the object from S3
    const data = await s3Client.send(new GetObjectCommand(getObjectParams));

    // Extract and return the code body from the response
    const codeBody = data.Body.toString();
    return codeBody;
  } catch (error) {
    throw new Error("Error fetching code body from S3");
  }
};


//------------------------------------------------------------XX  all codes of user  XX-----------------------------------------------------------

const getUserCodes = async (userId) => {
  try {
    const codes = await CODE.find({ userReference: userId });

    return codes.map((code) => ({ name: code.name,codeBodyURL: code.codeBodyURL,language: code.codeLanguage }));
    
  } catch (error) {
    throw new Error("Error fetching codes by user");
  }
};

//------------------------------------------------------------XX Get Specific Code By user  XX-----------------------------------------------------------
const getSpecificCode = async (codeId) => {
  try {
    const code = await CODE.findById(codeId);

    if (!code) {
      throw new Error("No code found!");
    }

    return code;
  } catch (error) {
    throw new Error("Error getting the specified code");
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  getusers,
  getUserCodes,
  codeSubmit,
  getSpecificCode,
  s3CodeBody
};


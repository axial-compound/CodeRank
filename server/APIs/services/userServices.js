const express = require("express");
const bcrypt = require("bcrypt");
const USER = require("../../models/userModel");
const CODE = require("../../models/codeModel");

const crypto = require("crypto");

//ENV file
require('dotenv').config();

const aws_url = process.env.BUCKET; // Bucket URL

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
      return; // Exit the function early if email already exists
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
const codeSubmit = async (tag, description, codeBody, codeLanguage, userId) => {
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
        tag: existingCode.tag,
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
        tag: tag,
        description: description,
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

//------------------------------------------------------------XX  all codes of user  XX-----------------------------------------------------------

const getUserCodes = async (userId) => {
  try {
    // If only userId is provided, fetch all codes by user and return their tags in JSON format
    const codes = await CODE.find({ userReference: userId });
    return codes.map((code) => ({ tag: code.tag }));
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
};

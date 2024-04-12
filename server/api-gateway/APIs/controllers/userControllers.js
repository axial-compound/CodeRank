const express = require("express");
const userServices = require("../services/userServices");
const USER = require("../../models/userModel");
const axios = require("axios");

//------------------------------------------------------------XX Users List  XX-----------------------------------------------------------
const getUserList = async (req, res) => {
  try {
    const user = await userServices.getusers(req.params.id);
    res.json(user.name);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

//------------------------------------------------------------XX Get Specific Code Controller  XX-----------------------------------------------------------
const getSpecificCodeByUser = async (req, res) => {
  try {
    const code = await userServices.getSpecificCode(req.params.codeId);

    res.json({ tag: code.tag, Language: code.Language, Body: code.codeBody });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: error.message });
  }
};

//------------------------------------------------------------XX All codes of user Controller  XX-----------------------------------------------------------
const getAllCodesByUser = async (req, res) => {
  const userId = req.user.id;

  const codes = await userServices.getUserCodes(userId);

  res.json(codes);
};

const runUserCode = async (req, res) => {
  try {
    const { codeBody, language } = req.body;

    // Check if codeBody or language is missing
    if (!codeBody || !language) {
      return res.status(400).json({ error: "Code or language not provided" });
    }

    // Map language to compiler selection route
    const compilerRoutes = {
      javascript: "/run/javascript",
      typescript: "/run/typescript",
      python: "/run/python",
      java: "/run/java",
      cpp: "/run/cpp",
      c: "/run/c",
    };

    // Check if the selected language is supported
    if (!compilerRoutes[language]) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    

    // Forward the request to the appropriate route in codeExecutorApp.js
    const response = await axios.post(
      `http://localhost:8000/run/${language}`,
      {
        codeBody,
      },
      {
        headers: {
          Authorization: `Bearer ${req.user.token}`, // Assuming token is stored in req.user.token
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error running code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//------------------------------------------------------------XX Submit User Code Controller XX-----------------------------------------------------------
const submitUserCode = async (req, res) => {
  try {
    const {name,codeBody, codeLanguage } = req.body;
    const userID = req.user.id;

    if (!name || !codeBody || !codeLanguage) {
      res.send("Please provide all the details");
    }

    const newCode = await userServices.codeSubmit(
      name,
      codeBody,
      codeLanguage,
      userID
    );

    res.json({ message: "code Submitted succesfully", code: newCode.name });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  getUserList,
  getAllCodesByUser,
  getSpecificCodeByUser,
  submitUserCode,
  runUserCode,
};

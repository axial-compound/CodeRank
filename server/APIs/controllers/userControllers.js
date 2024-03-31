const express = require('express');
const userServices = require('../services/userServices');
const USER = require('../../database/models/userModel');

const getUserList = async (req,res) =>{
    try {
        const user = await userServices.getusers(req.params.id);
        res.json(user.name);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const getSpecificCodeByUser = async (req,res) =>{
    try {
        const codeId = req.params.id;

        const code = await userServices.getSpecificCode(userId,codeId);

        res.json(code);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error!");
    }
};

const getAllCodesByUser = async (req,res) =>{
    const userId = req.user.id;
    
    const codes = await userServices.getUserCodes(userId);

    res.json(codes);
}

const runUserCode = async (req,res) =>{

}

const submitUserCodeAndRun = async (req,res) =>{
    try {
        const {tag,description,codeBody,codeLanguage} = req.body;
        const userID = req.user.id;

        if(!tag || !codeBody || !codeLanguage){
            res.send("Please provide all the details");
        }

        const newCode = await userServices.codeSubmit(tag,description,codeBody,codeLanguage,userID);

        res.json({message:"code Submitted succesfully",code: newCode.codeBody});
    } catch (error) {
        console.log(error);
        res.status(500).json("server error");
        
    }
};

module.exports= { getUserList, getAllCodesByUser, getSpecificCodeByUser, runUserCode, submitUserCodeAndRun};
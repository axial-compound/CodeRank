const express = require('express');
const userServices = require('../services/userServices');
const USER = require('../../models/userModel');


//------------------------------------------------------------XX Users List  XX-----------------------------------------------------------
const getUserList = async (req,res) =>{
    try {
        const user = await userServices.getusers(req.params.id);
        res.json(user.name);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

//------------------------------------------------------------XX Specific Code Controller  XX-----------------------------------------------------------
const getSpecificCodeByUser = async (req,res) =>{
    try {

        const code = await userServices.getSpecificCode(req.params.codeId);

        res.json({tag: code.tag ,Language: code.Language, Body: code.codeBody});

    } catch (error) {
        console.error(error);
        res.status(404).json({msg: error.message});
    }
};

//------------------------------------------------------------XX All codes of user Controller  XX-----------------------------------------------------------
const getAllCodesByUser = async (req,res) =>{
    const userId = req.user.id;
    
    const codes = await userServices.getUserCodes(userId);

    res.json(codes);
}

const runUserCode = async (req,res) =>{

}

//------------------------------------------------------------XX Submit User Code Controller XX-----------------------------------------------------------
const submitUserCode = async (req,res) =>{
    try {
        const {tag,description,codeBody,codeLanguage} = req.body;
        const userID = req.user.id;

        if(!tag || !codeBody || !codeLanguage){
            res.send("Please provide all the details");
        }

        const newCode = await userServices.codeSubmit(tag,description,codeBody,codeLanguage,userID);

        res.json({message:"code Submitted succesfully",code: newCode});
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
        
    }
};

module.exports= { getUserList, getAllCodesByUser, getSpecificCodeByUser, runUserCode, submitUserCode};
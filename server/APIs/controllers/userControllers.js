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

}

const getAllCodesByUser = async (req,res) =>{

}

const runUserCode = async (req,res) =>{

}

const submitUserCodeAndRun = async (req,res) =>{

}

module.exports= { getUserList, getAllCodesByUser, getSpecificCodeByUser, runUserCode, submitUserCodeAndRun};
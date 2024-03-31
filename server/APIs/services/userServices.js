const express = require('express');
const bcrypt = require('bcrypt');
const USER = require('../../database/models/userModel');
const CODE = require('../../database/models/codeModel');

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
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

    } catch (error) {
        console.error("Error registering user:", error);
    }
};


const authenticateUser = async(email,password) =>{
    try {
        const user = await USER.findOne({email});

        if(!user && (await bcrypt.compare(password,user.password))){
            throw new error('Invalid email and password');
        }
    
        return user;
    } catch (error) {
        console.error(error);
    }   
};

//only for checking

const getusers = async (id) =>{
    const user = await USER.findById(id);

    if(!user){
        throw new Error('No user found!') //error res is not defined
    }
    return user;
}

const codeSubmit = async (tag,description,codeBody,codeLanguage,userId) =>{
    const newCode = new CODE({
        tag: tag,
        description: description,
        codeBody: codeBody,
        codeLanguage: codeLanguage,
        userReference: userId
    });

    await newCode.save();

    return newCode;

};

//this function should retrive specific code of user or all codes of user
const getUserCodes = async (userId) => {
    try {
        
            // If only userId is provided, fetch all codes by user and return their tags in JSON format
            const codes = await CODE.find({ userReference: userId });
            return codes.map(code => ({ tag: code.tag }));
        
    } catch (error) {
        throw new Error('Error fetching codes by user');
    }
};

const getSpecificCode = async (codeId) =>{
    const code = await CODE.find({ _id: codeId});

    if(!code){
        throw new Error( "The requested resource could not be found." );
    }

    return code.toObject();
};



module.exports = {registerUser,authenticateUser,getusers, getUserCodes, codeSubmit, getSpecificCode}; 
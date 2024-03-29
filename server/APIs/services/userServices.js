const express = require('express');
const bcrypt = require('bcrypt');
const USER = require('../../database/models/userModel');

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

const codeSubmit = async () =>{

};

const getUserSubmittedCodes = async () =>{

}

module.exports = {registerUser,authenticateUser}; 
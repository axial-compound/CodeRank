// code-execution-service/middleware/authMiddleware.js
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    // Verify token
    jwt.verify(token.replace('Bearer ', ''), secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Attach decoded user information to request object for further processing
        req.user = decoded.user;
        next();
    });
};

module.exports = authenticateUser;

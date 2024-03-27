const express = require('express');
const router = express.Router();
const {userCodes} = require('../controllers/userControllers');


router.get('/list', userCodes );
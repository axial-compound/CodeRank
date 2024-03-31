const express = require('express');
const router = express.Router();
const authMiddlewarefunc  = require('../../middleware/authMiddleware');

const unAuthControllers = require('../controllers/unAuthControllers');

router.post('/login',unAuthControllers.login);
router.post('/register', unAuthControllers.register);
//router.post('/run', userControllers.runUserCode); //change this accordingly

module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddlewarefunc  = require('../../middleware/authMiddleware');

const unAuthControllers = require('../controllers/unAuthControllers');

router.get('/hey', (req,res)=>{
    res.json({msg:'Hey there!'});
});
router.post('/login',unAuthControllers.login);
router.post('/register', unAuthControllers.register);


module.exports = router;
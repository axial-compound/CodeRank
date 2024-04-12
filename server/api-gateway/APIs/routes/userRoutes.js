const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/:codeId/code', userControllers.getSpecificCodeByUser); // 
router.get('/codes', userControllers.getAllCodesByUser); // this route is working fine
//router.post('/run/:language', userControllers.runUserCode);
router.post('/submit', userControllers.submitUserCode); 


module.exports = router;
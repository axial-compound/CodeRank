const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/:id', userControllers.getUserList);
router.get('/:userId/:codeId', userControllers.getSpecificCodeByUser);
router.get('/:userId/codes', userControllers.getAllCodesByUser);
router.post('/run', userControllers.runUserCode);
router.post('/submit', userControllers.submitUserCodeAndRun);


module.exports = router;
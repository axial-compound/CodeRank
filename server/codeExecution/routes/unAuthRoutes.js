const express = require('express');
const router = express.Router();
const codeController = require('../controller/codeController');

router.post('/run',codeController.runCode);

module.exports = router;
const express = require('express');
const router = express.Router();
const { handleRegister } = require('../controllers/registerController');

router.post("/", handleRegister);

module.exports = router;
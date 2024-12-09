const express = require('express');
const router = express.Router();

const { loginUser, registerUser } = require('../controllers/authController');
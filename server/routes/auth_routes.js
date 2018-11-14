const router = require('express').Router();
const User = require('../schemas/user');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let authController = require('../controller/auth-controller/auth.controller');

//auth wth google
// router.get('/google', authController.googleLogin());

//callback route for google to redirect to
router.get('/google/callback', authController.googleResponse());

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

module.exports = router;
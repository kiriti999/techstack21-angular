const router = require('express').Router();

let authController = require('../controller/auth-controller/auth.controller');

//auth wth google
router.get('/google', authController.googleLogin());

//callback route for google to redirect to
router.get('/google/callback', authController.googleResponse());

module.exports = router;
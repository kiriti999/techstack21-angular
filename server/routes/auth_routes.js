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

router.post('/signup', function (req, res) {
    console.log('sign up...');
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/login', function (req, res) {
    User.findOne({ email: req.body.email })
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, (Buffer.from(user.password, 'base64').toString()), function (err, result) {
                if (err) {
                    console.log('password ', Buffer.from(user.password, 'base64').toString());
                    return res.status(401).json({
                        failed: 'Unauthorized Access',
                        pass: Buffer.from(user.password, 'base64').toString()
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({email: user.email,_id: user._id},
                    'secret', {expiresIn: '2h'});
                    return res.status(200).json({
                        user: {
                            id: user._id,
                            email: user.email,
                        },
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access',
                    pass: new Buffer(user.password, 'base64').toString('binary')
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;
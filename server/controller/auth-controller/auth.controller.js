const passport = require('passport');
const User = require('../../schemas/user');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let authController = {
    isUserLogin: function (req, res) {
        return res.send(req.isAuthenticated());
    },

    googleLogin: function (req, res) {
        // return passport.authenticate('google', {
        //     scope: [
        //         'profile', 'https://www.googleapis.com/auth/plus.login',
        //         'https://www.googleapis.com/auth/blogger',
        //         'https://www.googleapis.com/auth/userinfo.email'
        //     ]
        // });
        var user = {
            name: "Kiriti",
            role: "ROLE_ADMIN"
        };

        // res.send(user);
    },

    googleResponse: function () {
        return passport.authenticate('google', { failureRedirect: '/admin-login', successRedirect: '/' }),
            function (req, res) {
                console.log('google authentication success', req.user);
                // res.send(popupTools.popupResponse(req.user));
            };
    },

    signUp: async function (req, res) {

        let user = await User.findOne({ 'email': req.body.email }).exec();
        if (user) {
            console.log('This email is already registered');
            return res.send('This email is already registered');
        }

        return bcrypt.hash((Buffer.from(req.body.password, 'base64').toString()), 10, function (err, hash) {
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
                    const JWTToken = jwt.sign({ email: user.email, _id: user._id }, 'secret', { expiresIn: '2h' });
                    return res.status(200).json({
                        user: {
                            id: user._id,
                            email: user.email,
                        },
                        success: 'New user has been created',
                        token: JWTToken
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        });

        // let newUser = new User({
        //     _id: new mongoose.Types.ObjectId(),
        //     email: req.body.email,
        //     password: hash
        // });

        // await newUser.save(err => {
        //     if (err) {
        //         console.log(err);
        //         return res.send(err);
        //     } else {
        //         res.status(200).json({
        //             user: {
        //                 id: user._id,
        //                 email: user.email,
        //             },
        //             success: 'New user has been created',
        //             token: JWTToken
        //         });
        //     }
        // });

    },

    login: function (req, res) {
        // return passport.authenticate('local', { failureRedirect: '/auth/redirecto?url=login', successRedirect: '/auth/redirecto?url=/' });

        User.findOne({ email: req.body.email })
        .exec()
        .then(function (user) {
            bcrypt.compare((Buffer.from(req.body.password, 'base64').toString()), user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({ email: user.email, _id: user._id }, 'secret', { expiresIn: '2h' });
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
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

    },

    logout: function (req, res) {
        req.logout();
        return res.status(302).send({ url: '/' });
    },

    redirecto: function (req, res) {
        return res.status(302).send({ url: req.query.url });
    }
}
module.exports = authController;
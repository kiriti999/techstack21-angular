const passport = require('passport');
const User = require('../../schemas/user');

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

        res.send(user);
    },

    googleResponse: function () {
        return passport.authenticate('google', { failureRedirect: '/admin-login', successRedirect: '/' }),
        function (req, res) {
            console.log('google authentication success', req.user);
            // res.send(popupTools.popupResponse(req.user));
        };
    },

    signUp: async function (req, res) {
        console.log('hi1')
        let user = await User.findOne({ 'email': req.body.email }).exec();
        if (user) {
            return res.send('This email is already registered');
        }

        let newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.phone = req.body.phoneNo;
        newUser.email = req.body.email;
        console.log('decypt pass: ', (Buffer.from(req.body.password, 'base64').toString()));
        newUser.setPassword((Buffer.from(req.body.password, 'base64').toString()));
        await newUser.save(err => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.redirect(`./login?username=${req.body.email}&password=${req.body.password}`)
        });

    },

    login: function (req, res) {
        return passport.authenticate('local', { failureRedirect: '/auth/redirecto?url=login', successRedirect: '/auth/redirecto?url=dashboard' });
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

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../../config/auth_keys');
var config = require('../../config/config.json').props;
var userModel = require('../../schemas/user');
var nJwt = require('njwt');

passport.serializeUser(function (user, done) {
    console.log('');
    console.log('');
    console.log('serializing token ', user);
    console.log('');
    console.log('');
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('');
    console.log('');
    console.log('deserializing token ', user);
    console.log('');
    console.log('');
    userModel.findById(user.id).then(function (user) {
        done(null, user);
    })
});


//Google strategy
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: config.call_back_url_local + '/auth/google/callback',
},
    function (accessToken, refreshToken, profile, done) {
        var claims = {
            sub: 'Social Authentication',
            iss: 'https://www.techstack21.com',
            accessToken: accessToken
        };

        console.log('accessToken ', accessToken);
        var jwt = nJwt.create(claims, keys.session.cookieKey);
        jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000 * 1));
        var token = jwt.compact();

        var user = new userModel({
            "username": profile.emails[0].value,
            "profilePhoto": profile.photos[0].value,
            "googleId": profile.id,
            "role": keys.admins.indexOf(profile.emails[0].value) ? 'ROLE_ADMIN' : 'ROLE_USER',
            "accessToken": token
        });

        //check if user already exists
        userModel.findOne({ googleId: profile.id }).then(function (currentUser) {
            if (currentUser) {
                console.log('');
                console.log('');
                console.log('current user exists', currentUser);
                console.log('');
                console.log('');
                currentUser.accessToken = token;
                done(null, currentUser);
            } else {
                user.save().then(function (newUser) {
                    console.log('');
                    console.log('');
                    console.log('new user created', newUser);
                    console.log('');
                    console.log('');
                    newUser.accessToken = token;
                    done(null, newUser);
                });
            }
        });
    }
));


passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('inside local statergy', username);
        console.log(username, password);
        password = (Buffer.from(password, 'base64').toString());
        User.findOne({ email: username }, function (err, user) {
            console.log('find user ');
            console.log(err, user);

            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var sslRedirect = require('heroku-ssl-redirect');
var path = require('path');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var passport = require('passport');
var logger = require('morgan');


//imports
var compression = require('compression');
var keys = require('./config/auth_keys');
var authRoutes = require('./routes/auth_routes');
var social = require('./social/social_sharing');
var cloudinaryRouter = require('./routes/cloudinary');
var getRouter = require('./routes/get_routes');
var postRouter = require('./routes/post_routes');


// enable ssl redirect
app.use(sslRedirect());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: false
}));


//sessions
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


//connect to mongo db
mongoose.connect(keys.mongodb.dbUrl, { useNewUrlParser: true, autoIndex: false }, () => {
    console.log('connected to mongodb');
});


app.use('/auth', authRoutes);
app.use(cloudinaryRouter);
app.use(social);
app.use(getRouter);
app.use(postRouter);
app.use(compression());
app.use(cors());

// =======================
// configuration =========
// =======================
var config = require('../server/config/config.json').props;
var port = process.env.PORT || config.server_port;

app.set('port', (port));
app.use(express.static(path.join(__dirname, '../dist')));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../dist/index.html'));
});

//global error logger
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Log requests to the console
app.use(logger('dev'));

module.exports = app;
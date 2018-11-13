var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

// var UserSchema = new mongoose.Schema({
//     // email: {
//     //   type: String,
//     //   unique: true,
//     //   required: true,
//     //   trim: true
//     // },
//     username: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true
//     },
//     profilePhoto: String,
//     role: String,
//     googleId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     accessToken: {
//         type: String,
//         unique: true
//     }
//     // password: {
//     //   type: String,
//     //   required: true,
//     // },
//     // passwordConf: {
//     //   type: String,
//     //   required: true,
//     // }
// }, { timestamps: true });

// UserSchema.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// };

// UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// //authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//     User.findOne({ email: email })
//         .exec(function (err, user) {
//             if (err) {
//                 return callback(err)
//             } else if (!user) {
//                 var err = new Error('User not found.');
//                 err.status = 401;
//                 return callback(err);
//             }
//             bcrypt.compare(password, user.password, function (err, result) {
//                 if (result === true) {
//                     return callback(null, user);
//                 } else {
//                     return callback();
//                 }
//             });
//         });
// };

//hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });


var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
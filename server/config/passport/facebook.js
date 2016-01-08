var mongoose = require('mongoose');
var facebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var secrets = require('../secrets');

export default new facebookStrategy({
    clientID: secrets.facebook.clientID,
    clientSecret: secrets.facebook.clientSecret,
    callbackURL: secrets.facebook.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'name', 'displayName', 'photos', 'hometown', 'profileUrl', 'friends']
}, function (req, accessToken, refreshToken, profile, done) {

    User.findOne({facebook: profile.id}, function (err, existingUser) {
        if (existingUser) {
            return done(null, existingUser);
        } else {
            User.findById(profile.id, function (err, user) {
                user.facebook = profile.id;
                //user.email = profile.email;
                user.tokens.push({kind: 'facebook', accessToken: accessToken});
                user.profile.name = profile.displayName;
                user.profile.gender = profile.gender;
                user.profile.picture = profile.photos[0].value;
                user.save(function (err) {
                    done(err, user, {message: 'facebook account has been linked.'});
                });
            })
        }
    });
});

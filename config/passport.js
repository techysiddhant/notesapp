const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

module.exports = function(passport) {



    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, cb) => {
            const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                }
                // console.log(newUser);
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    cb(null, user);
                } else {
                    user = await User.create(newUser);
                    cb(null, user);
                }
            } catch (error) {
                console.log(error);
            }
        }
    ));




    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    })
}
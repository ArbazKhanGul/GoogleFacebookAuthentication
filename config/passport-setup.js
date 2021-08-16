const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user=require("../models/user-model");
FacebookStrategy = require('passport-facebook').Strategy;



passport.use(
    new FacebookStrategy({
        // options for google strategy
// Facebook
        callbackURL:"http://localhost:3000/auth/google/redirect",
        clientID:"3573383276220627",
        clientSecret:"30838d944b8940b3691fbc8f14b87fe4",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone','displayName', 'updated_time', 'verified'],
        // passReqToCallback: true,
        // profileFields: ['name']
        //  Googgle 
        // callbackURL:"/auth/google/redirect",
        // clientID:"542467501875-cvbt8t4rafplon65fr5qot5alu72872f.apps.googleusercontent.com",
        // clientSecret:"l3LBadLmRY0GJj_CKs4nAw4Y"
    }, (accessToken,refreshToken,profile,done) => {
       console.log(profile.id)
       console.log(profile.displayName)
        // done(null,profile.id)
    user.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){

            done(null, currentUser);
        } else {
            new user({
                googleId: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                
                done(null, newUser);
            
            });
        }
    })
    }
    ))
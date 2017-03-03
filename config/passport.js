var passport = require('passport');
var User = require('../app/models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

var localOptions = {
    usernameField: 'email',
    passReqToCallback: true
};

var localLogin = new LocalStrategy(localOptions, function(req, email, password, done){

  console.log(JSON.stringify(req.body)+'req');
    User.findOne({
        email: email,
        firma: req.body.firma,
        enabled: true,
        role: req.body.role
    }, function(err, user){

        if(err){
            return done(err);
        }

        if(!user){
            return done(null, false, {error: 'Girdiğiniz bilgilerden en az biri hatalı'});
        }

        if(user && user.enabled == false){
            return done(null, false, {error: 'Hesabınız yönetici tarafından aktive edilmedi'});
        }

        user.comparePassword(password, function(err, isMatch){

            if(err){
                return done(err);
            }

            if(!isMatch){
                return done(null, false, {error: 'Girdiğiniz bilgilerden en az biri hatalı'});
            }

            return done(null, user);

        });

    });

});

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    User.findById(payload._id, function(err, user){

        if(err){
            return done(err, false);
        }

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }

    });

});

passport.use(jwtLogin);
passport.use(localLogin);

import path from 'path';
import util from 'util';
import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import passportTwitter from 'passport-twitter';
const TwitterStrategy = passportTwitter.Strategy;
import * as usersModel from '../models/users-superagent';
import { sessionCookieName } from '../app';

export const router = express.Router();

import DBG from 'debug';
const debug = DBG('notes:router-users');
const error = DBG('notes:error-users');

export function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

export function ensureAuthenticated(req, res, next) {
    try {
        // req.user is set by Passport in the deserialize function
        if (req.user) next();
        else res.redirect('/users/login');
    } catch (e) { next(e); }
}

router.get('/login', function(req, res, next) {
    try {
        res.render('login', { title: "Login to Notes", user: req.user, });
    } catch (e) { next(e); }
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/', // SUCCESS: Go to home page
        failureRedirect: 'login' // FAIL: Go to /user/login
        //failureFlash: true
    })
);

// router.post('/login',
//     passport.authenticate('local',
//         {failureRedirect: 'login', // FAIL: Go to /user/login}),
//             function(req, res){
//                 res.redirect('back');
//             }
//     })
// );

router.get('/logout', function(req, res, next) {
    try {
        req.session.destroy();
        req.logout();
        res.clearCookie(sessionCookieName);
        res.redirect('/');
    } catch (e) { next(e); }
});

// passport.use(new LocalStrategy(
//     async (username, password, done) => {
//         try {
//             var check = await usersModel.userPasswordCheck(username,
//                 password);
//             if (check.check) {
//                 done(null, { id: check.username, username: check.username });
//             } else {
//                 done(null, false, check.message);
//             }
//         } catch (e) { done(e); }
//     }
// ));

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            var check = await usersModel.userPasswordCheck(username,
                password);
            if (check.check) {
                done(null, { id: check.username, username: check.username });
            } else {
                done(null, false, check.message);
            }
        } catch (e) { done(e); }
    }
));

const twittercallback = process.env.TWITTER_CALLBACK_HOST
    ? process.env.TWITTER_CALLBACK_HOST
    : "http://localhost:3000";

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${twittercallback}/users/auth/twitter/callback`
    },
    async function(token, tokenSecret, profile, done) {
        try {
            done(null, await usersModel.findOrCreate({
                id: profile.username, username: profile.username, password: "",
                provider: profile.provider, familyName: profile.displayName,
                givenName: "", middleName: "",
                photos: profile.photos, emails: profile.emails
            }));
        } catch(err) { done(err); }
    }
));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
        failureRedirect: '/users/login' }));

passport.serializeUser(function(user, done) {
    try {
        debug(`serializeUser user=${user.username}`);
        done(null, user.username);
    } catch (e) { done(e); }
});

passport.deserializeUser(async (username, done) => {
    try {
        var user = await usersModel.find(username);
        debug(`deserializeUser user=${username} ==> ${util.inspect(user)}`);
        done(null, user);
    } catch(e) { done(e); }
});
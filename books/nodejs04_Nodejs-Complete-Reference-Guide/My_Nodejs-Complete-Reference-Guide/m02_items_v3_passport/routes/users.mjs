import  * as userModel from '../model/user.mjs'
const CatalogUser = userModel.CatalogUser
import passport from 'passport'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
export const strategy = 'local'
import express from 'express'
const router = express.Router()

export function initPassport(app) {
    app.use(passport.initialize())
    app.use(passport.session())
}
// requires the model with Passport-Local Mongoose plugged in
// USE "createStrategy" INSTEAD OF "authenticate"
// This uses and configures passport-local behind the scenes
//passport.use(CatalogUser.createStrategy());
passport.use(new LocalStrategy(CatalogUser.authenticate()))

// use static serialize and deserialize of model for passport session support
passport.serializeUser(CatalogUser.serializeUser());
passport.deserializeUser(CatalogUser.deserializeUser());

export function authorize(user, response) {
    if ((user == null) || (user.role != 'admin')) {
        response.writeHead(403, { 'Content-Type' :
                'text/plain'});
        response.end('Forbidden');
        return;
    }
}


router.post('/register', (request, response) => {
    // Creates and saves a new user with a salt and hashed password
    CatalogUser.register(new CatalogUser({username: request.body.username}), request.body.password, function(err, user) {
        if (err) {
            console.log(err);
            response.statusCode = 404
            response.write(err.toString())
            response.end()
        } else {
            passport.authenticate('local')(request, response, function() {
                response.statusCode = 200
                response.write('User added.')
                response.end()
            });
        }
    });
});

export {router, passport}
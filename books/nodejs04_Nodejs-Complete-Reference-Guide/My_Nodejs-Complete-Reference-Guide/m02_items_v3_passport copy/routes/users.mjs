import  * as userModel from '../model/user.mjs'
const CatalogUser = userModel.CatalogUser
import passport from 'passport'
import passportHttp from 'passport-http'
//const BasicStrategy = passportHttp.BasicStrategy;
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
//const LocalStrategy = passportHttp.Strategy;
export const strategy = 'local'

export function initPassport(app) {
    app.use(passport.initialize())
    app.use(passport.session())
}

//passport.use(new BasicStrategy(
passport.use(new LocalStrategy(
    async (username, password, done) => {
        console.log('username='+username + '  password='+password)
        CatalogUser.findOne({username: username}, (err, user) => {
        if (err) {return done(err)}
        if (!user || !user.validPassword(password)) {
            done(null, false, { message: "Invalid username/password" })
        } else {
            console.log(user.username + ' authenticated successfully')
            return done(null, user)
        }
    }).catch(e => done(e))
}))

export function restricted(req, res, next) {
    if (req.isUnAuthenticated()) return req.json(403, {message: 'Access denied, please log in'});
    next();
}

export function usersAdd(){
    const name1 = 'apiuser'
    const password1 = 'password1'
    try {
        const newuser = new CatalogUser({username: name1, password: password1})
        newuser.save().then(() => console.log('user add.'))
    } catch (e) {
        console.log(`failed to insert a user, ${e.stack}`);
    }
}

passport.serializeUser(function(user, done){
    console.log("serializeUser, id="+ user.id);

    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    console.log("deserialize id="+id);
    CatalogUser.findById(id, (err, user) => {
        done(err, user);
    });
});

export {passport}
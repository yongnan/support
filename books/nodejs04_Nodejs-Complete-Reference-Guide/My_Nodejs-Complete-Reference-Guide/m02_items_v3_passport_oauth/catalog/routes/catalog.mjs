import express from 'express'
import url from 'url'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
const router = express.Router()
import connectMultiparty from 'connect-multiparty'
const multiparty = connectMultiparty()

import * as catalogV1 from '../modules/catalogV1.mjs'
import * as catalogV2 from '../modules/catalogV2.mjs'
import * as catalogV3 from '../modules/catalogV3.mjs'
import * as model from '../model/item.mjs'
import * as userModel from '../model/user.mjs'
const AuthUser = userModel.CatalogUser

import CacheControl from "express-cache-control"
var cache = new CacheControl().middleware

import passport from 'passport'
import passportHttp from 'passport-http'
// import passportGoogleOauth from 'passport-google-oauth20'

const BasicStrategy = passportHttp.BasicStrategy
const strategeName = 'basic'
passport.use(new BasicStrategy(
    function(username, password, done) {
        AuthUser.findOne({username: username, password: password},
            function(error, user) {
                if (error) {
                    return done(error)
                } else {
                    if (!user) {
                        console.log('unknown user')
                        return done(error)
                    } else {
                        console.log(user.username + 'authenticated successfully')
                        return done(null, user)
                    }
                }
            }
        )
    })
)

// var GoogleStrategy = passportGoogleOauth.Strategy;
// passport.use(strategeName, new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://"+process.env.callbackURL + "/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         //lookup the profile and authenticate   and call done
//         AuthUser.findOrCreate({ googleId: profile.id }, function (err, user) {
//           //return cb(err, user);
//             if (err) {
//                     return done(err)
//             } else {
//                 if (!user) {
//                     console.log('unknown user')
//                     return done(err)
//                 } else {
//                     console.log(user.username + 'authenticated successfully')
//                     return done(null, user)
//                 }
//             }
//
//         })
//     }
// ))

// ---------------------------------------------------------
// V1
// ---------------------------------------------------------
// Authenticate protected all /v1 resources
router.get('/v1/', passport.authenticate(strategeName, { session: false, scope: ['profile'] }),
    async (req, res, next) => {
    catalogV1.findAllItems(res)
})

router.get('/v1/item/:itemId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.itemId)
    catalogV1.findItemById(req.params.itemId, res)
})

router.get('/v1/:categoryId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.categoryId)
    catalogV1.findItemsByCategory(req.params.categoryId, res)
})

router.post('/v1/', async (req, res, next) => {
    console.log('Saving item using POST method')
    catalogV1.saveItem(req, res)
})

router.put('/v1/', async (req, res, next) => {
    console.log('Saving item using PUT method')
    catalogV1.saveItem(req, res)
})

router.put('/v1/:itemId', async (req, res, next) => {
    catalogV1.saveItem(req, res)
})

router.delete('/v1/item/:itemId', async (req, res, next) => {
    console.log('Deleting item with id:', req.params.itemId)
    catalogV1.remove(req, res)
})

// ---------------------------------------------------------
// V2
// ---------------------------------------------------------
// Authenticate protected all /v2 resources
router.get('/v2/', passport.authenticate(strategeName, { session: false, scope: ['profile'] }),
    async (req, res) => {
        var getParams = url.parse(req.url, true).query
        if (getParams['page'] !=null) {
            catalogV2.paginate(model.CatalogItem, req, res)
        } else {
            var key = Object.keys(getParams)[0]
            var value = getParams[key]
            catalogV2.findItemsByAttribute(key, value, res)
        }
})
router.get('/v2/:categoryId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.categoryId)
    catalogV2.findItemsByCategory(req.params.categoryId, res)
})

router.get('/v2/item/:itemId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.itemId)
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV2.findItemById(gfs, req, res)
})

router.post('/v2/', async (req, res, next) => {
    catalogV2.saveItem(req, res)
})

router.put('/v2/', async (req, res, next) => {
    catalogV2.saveItem(req, res)
})

router.delete('/v2/item/:itemId', async (req, res, next) => {
    catalogV2.remove(req, res)
})

// ---------------------------------------------------------
// V2 item/images
// ---------------------------------------------------------
router.get('/v2/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV2.getImage(gfs, req, res)
})

router.post('/v2/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV2.saveImage(gfs, req, res)
})

router.put('/v2/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV2.saveImage (gfs, req, res)
})

router.delete('/v2/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV2.deleteImage(gfs, model.connection,
        req.params.itemId, res)
})

// ---------------------------------------------------------
// V3
// ---------------------------------------------------------
// Authenticate protected all /v3 resources
router.get('/v3/', cache('minutes', 1), passport.authenticate(strategeName, { session: false, scope: ['profile'] }),
    async (req, res) => {
        var getParams = url.parse(req.url, true).query
        if (getParams['page'] !=null || getParams['limit'] != null) {
            catalogV3.paginate(model.CatalogItem, req, res)
        } else {
            var key = Object.keys(getParams)[0]
            var value = getParams[key]
            catalogV3.findItemsByAttribute(key, value, res)
        }
})

router.get('/v3/:categoryId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.categoryId)
    catalogV3.findItemsByCategory(req.params.categoryId, res)
})

router.get('/v3/item/:itemId', async (req, res, next) => {
    console.log(req.url + ' : querying for ' + req.params.itemId)
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.findItemById(gfs, req, res)
})

router.post('/v3/', async (req, res, next) => {
    catalogV3.saveItem(req, res)
})

router.put('/v3/', async (req, res, next) => {
    catalogV2.saveItem(req, res)
})

router.delete('/v3/item/:itemId', async (req, res, next) => {
    catalogV2.remove(req, res)
})

// ---------------------------------------------------------
// V3 item/images
// ---------------------------------------------------------
router.get('/v3/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.getImage(gfs, model.connection.db, req, res)
})

router.post('/item/:itemId/image', multiparty, async (req, res) =>{
    //redirectsVersion('/item/'+req.params.itemId+'/image', res)
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.saveImage(gfs, model.connection.db, req, res)
})
router.post('/v3/item/:itemId/image', multiparty, async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.saveImage(gfs, model.connection.db, req, res)
})

router.put('/item/:itemId/image', multiparty, async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.saveImage (gfs, model.connection.db, req, res)
})
router.put('/v3/item/:itemId/image', multiparty, async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.saveImage (gfs, model.connection.db, req, res)
})

router.delete('/v3/item/:itemId/image', async (req, res) =>{
    var gfs = Grid(model.connection.db, mongoose.mongo)
    catalogV3.deleteImage(gfs, model.connection,
        req.params.itemId, res)
})

// ------------- Current version redirects --------------------------------
// items
router.get('/:categoryId', async (req, res, next) => {
    redirectsVersion('/' + req.params.categoryId, req, res)
})
router.get('/item/:itemId', async (req, res, next) => {
    redirectsVersion('/item/' + req.params.itemId, req, res)
})
router.post('/', async (req, res, next) => {
    redirectsVersion('/', req, res)
})
router.put('/', async (req, res, next) => {
    redirectsVersion('/', req, res)
})
router.delete('/item/:itemId', async (req, res, next) =>{
    redirectsVersion('/item/' + req.params.itemId, req, res)
})
router.get('/', async (req, res) => {
    redirectsVersion('/', req, res)
})

router.get('/item/:itemId/image', async (req, res) =>{
    redirectsVersion('/item/'+req.params.itemId+'/image/', req, res)
})

// item/images
router.delete('/item/:itemId/image', async (req, res) =>{
    redirectsVersion('/item/'+req.params.itemId+'/image/', req, res)
})

// --------------------------------------------------------------------
function redirectsVersion(location, req, res){
    const version = 'v3'
    location = '/catalog/' + version + location
    console.log('Redirecting to ' + location)
    //res.writeHead(301, {'Location' : location})
    //res.end('Version 1 is moved to /catalog/' + location )

    var oldParams = ""
    if (req.originalUrl != null && req.originalUrl.indexOf('?') > 0) {
        oldParams = req.originalUrl.split("?")[1]
    }
    if (oldParams != "" && location.indexOf('?') > 0) {
        oldParams = "&" + oldParams
    } else {
        oldParams = "?" + oldParams
    }
    res.redirect(307, location + oldParams)
}

export {router}

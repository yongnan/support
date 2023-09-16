var express = require('express');
const url = require('url');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var router = express.Router();
var multiparty = require('connect-multiparty')();

var catalogV1 = require('../modules/catalogV1')
var catalogV2 = require('../modules/catalogV2')
var catalogV3 = require('../modules/catalogV3')
const model = require('../model/item.js');
const AuthUser = require('../model/user.js').CatalogUser;

CacheControl = require("express-cache-control")
var cache = new CacheControl().middleware;

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// passport.use(new BasicStrategy(function(username, password, done) {
//     if (username == 'user' && password=='default') {
//         return done(null, username);
//     }
// }));

passport.use(new BasicStrategy(
    function(username, password, done) {
        AuthUser.findOne({username: username, password: password},
            function(error, user) {
                if (error) {
                    return done(error);
                } else {
                    if (!user) {
                        console.log('unknown user');
                        return done(error);
                    } else {
                        console.log(user.username + 'authenticated successfully');
                        return done(null, user);
                    }
                }
            });
    })
);

// ---------------------------------------------------------
// V1
// ---------------------------------------------------------
router.get('/v1/',
    passport.authenticate('basic', { session: false }),
    function(req, res, next) {
    catalogV1.findAllItems(res);
});

router.get('/v1/item/:itemId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.itemId);
    catalogV1.findItemById(req.params.itemId, res);
});

router.get('/v1/:categoryId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.categoryId);
    catalogV1.findItemsByCategory(req.params.categoryId, res);
});

router.post('/v1/', function(req, res, next) {
    console.log('Saving item using POST method');
    catalogV1.saveItem(req, res);
});

router.put('/v1/', function(req, res, next) {
    console.log('Saving item using PUT method');
    catalogV1.saveItem(req, res);
});

router.put('/v1/:itemId', function(req, res, next) {
    catalogV1.saveItem(req, res);
});

router.delete('/v1/item/:itemId', function(req, res, next) {
    console.log('Deleting item with id:', req.params.itemId);
    catalogV1.remove(req, res);
});

// ---------------------------------------------------------
// V2
// ---------------------------------------------------------
router.get('/v2/',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
    var getParams = url.parse(req.url, true).query;
    if (getParams['page'] !=null) {
        catalogV2.paginate(model.CatalogItem, req, res);
    } else {
        var key = Object.keys(getParams)[0];
        var value = getParams[key];
        catalogV2.findItemsByAttribute(key, value, res);
    }
});
router.get('/v2/:categoryId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.categoryId);
    catalogV2.findItemsByCategory(req.params.categoryId, res);
});

router.get('/v2/item/:itemId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.itemId);
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.findItemById(gfs, req, res);
});

router.post('/v2/', function(req, res, next) {
    catalogV2.saveItem(req, res);
});

router.put('/v2/', function(req, res, next) {
    catalogV2.saveItem(req, res);
});

router.delete('/v2/item/:itemId', function(req, res, next) {
    catalogV2.remove(req, res);
});

// ---------------------------------------------------------
// V2 item/images
// ---------------------------------------------------------
router.get('/v2/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.getImage(gfs, req, res);
});

router.post('/v2/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage(gfs, req, res);
});

router.put('/v2/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage (gfs, req, res);
});

router.delete('/v2/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.deleteImage(gfs, model.connection,
        req.params.itemId, res);
});

// ---------------------------------------------------------
// V3
// ---------------------------------------------------------
router.get('/v3/',
    passport.authenticate('basic', { session: false }),
    cache('minutes', 1),
    function(req, res) {
    var getParams = url.parse(req.url, true).query;
    if (getParams['page'] !=null || getParams['limit'] != null) {
        catalogV3.paginate(model.CatalogItem, req, res);
    } else {
        var key = Object.keys(getParams)[0];
        var value = getParams[key];
        catalogV3.findItemsByAttribute(key, value, res);
    }
});

router.get('/v3/:categoryId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.categoryId);
    catalogV3.findItemsByCategory(req.params.categoryId, res);
});

router.get('/v3/item/:itemId', function(req, res, next) {
    console.log(req.url + ' : querying for ' + req.params.itemId);
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.findItemById(gfs, req, res);
});

router.post('/v3/', function(req, res, next) {
    catalogV3.saveItem(req, res);
});

router.put('/v3/', function(req, res, next) {
    catalogV2.saveItem(req, res);
});

router.delete('/v3/item/:itemId', function(req, res, next) {
    catalogV2.remove(req, res);
});

// ---------------------------------------------------------
// V3 item/images
// ---------------------------------------------------------
router.get('/v3/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.getImage(gfs, model.connection.db, req, res);
});

router.post('/item/:itemId/image', multiparty, function(req, res){
    //redirectsVersion('/item/'+req.params.itemId+'/image', res)
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.saveImage(gfs, model.connection.db, req, res);
});
router.post('/v3/item/:itemId/image', multiparty,  function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.saveImage(gfs, model.connection.db, req, res);
});

router.put('/item/:itemId/image', multiparty, function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.saveImage (gfs, model.connection.db, req, res);
});
router.put('/v3/item/:itemId/image', multiparty, function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.saveImage (gfs, model.connection.db, req, res);
});

router.delete('/v3/item/:itemId/image', function(req, res){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV3.deleteImage(gfs, model.connection,
        req.params.itemId, res);
});

// ------------- Current version redirects --------------------------------
// items
router.get('/:categoryId', function(req, res, next) {
    redirectsVersion('/' + req.params.categoryId, req, res)
});
router.get('/item/:itemId', function(req, res, next) {
    redirectsVersion('/item/' + req.params.itemId, req, res)
});
router.post('/', function(req, res, next) {
    redirectsVersion('/', req, res)
});
router.put('/', function(req, res, next) {
    redirectsVersion('/', req, res)
});
router.delete('/item/:itemId', function(req, res, next) {
    redirectsVersion('/item/' + req.params.itemId, req, res)
});
router.get('/', function(req, res) {
    redirectsVersion('/', req, res)
});

router.get('/item/:itemId/image', function(req, res){
    redirectsVersion('/item/'+req.params.itemId+'/image/', req, res)
});

// item/images
router.delete('/item/:itemId/image', function(req, res){
    redirectsVersion('/item/'+req.params.itemId+'/image/', req, res)
});

// --------------------------------------------------------------------
function redirectsVersion(location, req, res){
    const version = 'v3'
    location = '/catalog/' + version + location
    console.log('Redirecting to ' + location);
    //res.writeHead(301, {'Location' : location});
    //res.end('Version 1 is moved to /catalog/' + location );

    var oldParams = ""
    if (req.originalUrl != null && req.originalUrl.indexOf('?') > 0) {
        oldParams = req.originalUrl.split("?")[1];
    }
    if (oldParams != "" && location.indexOf('?') > 0) {
        oldParams = "&" + oldParams;
    } else {
        oldParams = "?" + oldParams;
    }
    res.redirect(307, location + oldParams);
}

module.exports = router;

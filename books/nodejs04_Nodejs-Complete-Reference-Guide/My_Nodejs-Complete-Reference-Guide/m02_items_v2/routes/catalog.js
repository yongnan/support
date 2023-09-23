var express = require('express');
var router = express.Router();
const url = require('url');

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');


var catalogV1 = require('../modules/catalogV1')
var catalogV2 = require('../modules/catalogV2')
const model = require('../model/item.js');

// ---------------------------------------------------------
// V1
// ---------------------------------------------------------
router.get('/v1/', function(request, response, next) {
    catalogV1.findAllItems(response);
});

router.get('/v1/item/:itemId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.itemId);
    catalogV1.findItemById(request.params.itemId, response);
});

router.get('/v1/:categoryId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.categoryId);
    catalogV1.findItemsByCategory(request.params.categoryId, response);
});

router.post('/v1/', function(request, response, next) {
    console.log('Saving item using POST method');
    catalogV1.saveItem(request, response);
});

router.put('/v1/', function(request, response, next) {
    console.log('Saving item using PUT method');
    catalogV1.saveItem(request, response);
});

router.put('/v1/:itemId', function(request, response, next) {
    catalogV1.saveItem(request, response);
});

router.delete('/v1/item/:itemId', function(request, response, next) {
    console.log('Deleting item with id:', request.params.itemId);
    catalogV1.remove(request, response);
});

// ---------------------------------------------------------
// V2
// ---------------------------------------------------------
router.get('/v2/', function(request, response) {
    var getParams = url.parse(request.url, true).query;
    if (getParams['page'] !=null) {
        catalogV2.paginate(model.CatalogItem, request, response);
    } else {
        var key = Object.keys(getParams)[0];
        var value = getParams[key];
        catalogV2.findItemsByAttribute(key, value, response);
    }
});
router.get('/v2/:categoryId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.categoryId);
    catalogV2.findItemsByCategory(request.params.categoryId, response);
});

router.get('/v2/item/:itemId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.itemId);
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.findItemById(gfs, request, response);
});

router.post('/v2/', function(request, response, next) {
    catalogV2.saveItem(request, response);
});

router.put('/v2/', function(request, response, next) {
    catalogV2.saveItem(request, response);
});

router.delete('/v2/item/:itemId', function(request, response, next) {
    catalogV2.remove(request, response);
});

// ---------------------------------------------------------
// V2 item/images
// ---------------------------------------------------------
router.get('/v2/item/:itemId/image', function(request, response){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.getImage(gfs, request, response);
});

router.post('/item/:itemId/image', function(request, response){
    //redirectsV1('/item/'+request.params.itemId+'/image', response)
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage(gfs, request, response);
});
router.post('/v2/item/:itemId/image', function(request, response){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage(gfs, request, response);
});

router.put('/item/:itemId/image', function(request, response){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage (gfs, request, response);
});
router.put('/v2/item/:itemId/image', function(request, response){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.saveImage (gfs, request, response);
});

router.delete('/v2/item/:itemId/image', function(request, response){
    var gfs = Grid(model.connection.db, mongoose.mongo);
    catalogV2.deleteImage(gfs, model.connection,
        request.params.itemId, response);
});

// ------------- Current version redirects --------------------------------
// items
router.get('/:categoryId', function(request, response, next) {
    redirectsV1('/' + request.params.categoryId, response)
});
router.get('/item/:itemId', function(request, response, next) {
    redirectsV1('/item/' + request.params.itemId, response)
});
router.post('/', function(request, response, next) {
    redirectsV1('/', response)
});
router.put('/', function(request, response, next) {
    redirectsV1('/', response)
});
router.delete('/item/:itemId', function(request, response, next) {
    redirectsV1('/item/' + request.params.itemId, response)
});
router.get('/', function(request, response) {
    redirectsV1('/', response)
});

router.get('/item/:itemId/image', function(request, response){
    redirectsV1('/item/'+request.params.itemId+'/image/', response)
});

// item/images
router.delete('/item/:itemId/image', function(request, response){
    redirectsV1('/item/'+request.params.itemId+'/image/', response)
});

// --------------------------------------------------------------------
function redirectsV1(location, response){
    const version = 'v2'
    location = '/catalog/' + version + location
    console.log('Redirecting to ' + location);
    //response.writeHead(301, {'Location' : location});
    //response.end('Version 1 is moved to /catalog/' + location );
    response.redirect(307, location);
}

module.exports = router;

var express = require('express');
var router = express.Router();

var catalog = require('../modules/catalog')
const model = require('../model/item.js');

router.get('/', function(request, response, next) {
    catalog.findAllItems(response);
});

router.get('/item/:itemId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.itemId);
    catalog.findItemById(request.params.itemId, response);
});

router.get('/:categoryId', function(request, response, next) {
    console.log(request.url + ' : querying for ' + request.params.categoryId);
    catalog.findItemsByCategory(request.params.categoryId, response);
});

router.post('/', function(request, response, next) {
    console.log('Saving item using POST method');
    catalog.saveItem(request, response);
});

router.put('/', function(request, response, next) {
    console.log('Saving item using PUT method');
    catalog.saveItem(request, response);
});

router.delete('/item/:itemId', function(request, response, next) {
    console.log('Deleting item with id:', request.params.itemId);
    catalog.remove(request, response);
});

module.exports = router;
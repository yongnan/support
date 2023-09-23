var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//const Grid = require('gridfs-stream');

mongoose.connect('mongodb://localhost/catalog');
var connection = mongoose.connection;
console.log('connection ', connection)

var itemSchema = new Schema ({
    "itemId" : {type: String, index: {unique: true}},
    "itemName": String,
    "price": Number,
    "currency" : String,
    "categories": [String]
});

console.log('paginate');
itemSchema.plugin(mongoosePaginate);

var CatalogItem = mongoose.model('Item', itemSchema);
module.exports = {CatalogItem : CatalogItem, connection : mongoose.connection };

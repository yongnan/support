import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
var Schema = mongoose.Schema
//const Grid = require('gridfs-stream')

mongoose.connect('mongodb://localhost/catalog')
let connection = mongoose.connection
console.log('connection ', connection)

var itemSchema = new Schema ({
    "itemId" : {type: String, index: {unique: true}},
    "itemName": String,
    "price": Number,
    "currency" : String,
    "categories": [String]
})

console.log('paginate')
itemSchema.plugin(mongoosePaginate)

let CatalogItem = mongoose.model('Item', itemSchema)

export {CatalogItem, connection}

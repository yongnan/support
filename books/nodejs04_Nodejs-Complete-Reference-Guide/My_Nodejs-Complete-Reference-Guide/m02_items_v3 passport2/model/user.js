const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/catalog')
let connection = mongoose.connection
console.log('connection ', connection)

var userSchema = new Schema ({
    "username" : {type: String, index: {unique: true}},
    "password": String
})

let CatalogUser = mongoose.model('User', userSchema)

module.exports = {CatalogUser : CatalogUser, connection : mongoose.connection };

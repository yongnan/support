import mongoose from 'mongoose'
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/catalog')
let connection = mongoose.connection
console.log('connection ', connection)

var userSchema = new Schema ({
    "userName" : {type: String, index: {unique: true}},
    "password": String
})

let CatalogUser = mongoose.model('User', userSchema)

export {CatalogUser, connection}

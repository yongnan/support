import mongoose from 'mongoose'
var Schema = mongoose.Schema
import uniqueValidator from 'mongoose-unique-validator'
import passportLocalMongoose from 'passport-local-mongoose'

mongoose.connect('mongodb://localhost/catalog')
let connection = mongoose.connection
console.log('connection ', connection)

var userSchema = new Schema ({
    "username" : {type: String, index: {unique: true}},
    "role" : {type: String}
})

userSchema.plugin(uniqueValidator);
userSchema.plugin(passportLocalMongoose);

let CatalogUser = mongoose.model('User', userSchema)

export {CatalogUser, connection}

import mongoose from 'mongoose'
var Schema = mongoose.Schema
import uniqueValidator from 'mongoose-unique-validator'
import bt from 'bcrypt'
const saltRounds = 10
var salt = bt.genSaltSync(saltRounds);

mongoose.connect('mongodb://localhost/catalog')
let connection = mongoose.connection
console.log('connection ', connection)

var userSchema = new Schema ({
    "username" : {type: String, index: {unique: true}},
    passwordHash: { type: String, required: true }
})

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = function(password) {
    return bt.compareSync(password, this.passwordHash);
};

userSchema.virtual("password").set(function(value) {
    this.passwordHash = bt.hashSync(value, salt);
})

let CatalogUser = mongoose.model('User', userSchema)

export {CatalogUser, connection}

'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : String,
    surname : String,
    email : String,
    password : String,
    role : String,
    image : String,
    CualquierCampo : String
});


var User = mongoose.model('User',UserSchema);

module.exports = User; 
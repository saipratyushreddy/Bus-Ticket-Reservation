const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    gender:String,
    dob:String
});

const user = mongoose.model('username_password',userSchema);

module.exports = user;
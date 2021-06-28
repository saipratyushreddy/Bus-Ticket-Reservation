const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    travels:String,
    busno:String,
    from:String,
    to:String,
    seats:Number,
    price:Number,
    dep:String,
    arr:String
});

const bus = mongoose.model('buses',busSchema);

module.exports = bus;
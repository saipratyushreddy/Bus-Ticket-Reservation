const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bus = require('../Api/Models/Buses');

mongoose.connect('mongodb://127.0.0.1:27017/bus_app',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

let bus_data;

router.post('/', async(req,res)=>{
    bus.find({from:req.body.from,to:req.body.to},(err,response)=>{
        if (err) throw err;
        else{
            bus_data=response;
            console.log(bus_data);
            res.send(bus_data);
        }
    })
    //res.send(login_data);
});
// router.get('/',(req,res)=>{
//     res.send(bus_data);
// })

module.exports = router;
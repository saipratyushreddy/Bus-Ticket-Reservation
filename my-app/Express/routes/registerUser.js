const express = require('express');
const router = express.Router();
const user = require('../Api/Models/User');

router.post('/', async(req,res)=>{
    let user_ins = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        mobile:req.body.mobile,
        gender:req.body.gender,
        dob:req.body.dob
    }
    console.log(user_ins)
    user(user_ins).save((err,result)=>{
        if (err) console.log(err)
        res.status(201).json(result);
    }) 
});




module.exports = router;
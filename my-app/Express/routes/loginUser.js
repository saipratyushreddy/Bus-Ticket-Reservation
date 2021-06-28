const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../Api/Models/User');

mongoose.connect('mongodb://127.0.0.1:27017/bus_app',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
let login_data={
    login: false,
    name:'',
    email:'',
    gender:'',
    mobile:''
}
router.post('/', async(req,res)=>{
    
    let entered_password=req.body.password;
    user.findOne({email:req.body.email},(err,response)=>{
        if (err) throw err;
        else{
            login_data.login=false;
            if(response.password===entered_password){
                login_data.login=true;
                login_data.name=response.name;
                login_data.email=response.email;
                login_data.mobile=response.mobile;
                login_data.gender=response.gender;
            }
            console.log(login_data);
            res.send(login_data);
        }
    })   
});

module.exports = router;
const express = require('express');
const app = express();
const port= 4200;
const cors = require('cors');
//const hbs=require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const registerUser = require('./routes/registerUser');
const loginUser = require('./routes/loginUser');
const busSearch = require('./routes/busSearch');

mongoose.connect('mongodb://127.0.0.1:27017/bus_app',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors());
app.use(express.json());

app.set('views', path.join(__dirname,'./Templates'));
app.set('view engine','hbs')

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static('public'));

app.use('/registerUser',registerUser);
app.use('/login',loginUser);
app.use('/busSearch',busSearch);


app.listen(port,()=>{
    console.log(`App running localhost ${port}`);
});
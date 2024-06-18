const  mongoose=require('mongoose');
const morgan = require('morgan')
mongoose.connect('mongodb://localhost:27017/userDateas');
const bodyparser = require('body-parser');
const path = require('path')
const nocache = require('nocache')

const express = require("express");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "public")));
app.use(nocache())
app.use(morgan('dev'));

const userRoute = require('./router/userRouter');
const adminRoute = require('./router/adminRouter')

app.use('/', userRoute);  
app.use('/admin', adminRoute)

app.listen(3000,function(){
    console.log("sever running ")
});
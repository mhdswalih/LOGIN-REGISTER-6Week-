const express = require("express");
const session = require('express-session')
const userRouter = express();
const userController = require("../controllers/userController");
const Auth = require('../middleware/userAuth');
const config = require('../config/config')

userRouter.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false
}))

userRouter.set('view engine', 'ejs');
userRouter.set('views', './views/user');

userRouter.get('/', Auth.isLogin, userController.loadHome)
userRouter.get('/signup', Auth.isLogout, userController.loadRegister);
userRouter.post('/signup', Auth.isLogout, userController.insertUser);
userRouter.get('/login', Auth.isLogout, userController.loadLogin);
userRouter.post('/login', Auth.isLogout, userController.verify);
userRouter.get('/home', Auth.isLogin, userController.loadHome)
userRouter.get('/edit-profile', Auth.isLogin, userController.loadEdit)
userRouter.post('/userEdit', Auth.isLogin, userController.userEdit) 
userRouter.get('/logout', Auth.isLogin, userController.logout);

module.exports = userRouter;

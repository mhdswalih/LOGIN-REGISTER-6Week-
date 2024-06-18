const express = require('express');
const session = require('express-session');
const config = require('../config/config');
const auth = require('../middleware/adminAuth');
const adminController = require("../controllers/adminController");

const adminRoute = express();

adminRoute.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin');
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));


//Default route
adminRoute.get('/', auth.isLogout, adminController.loadLogin);

//Login route
adminRoute.get('/login', auth.isLogout, adminController.loadLogin);

//Validation
adminRoute.post('/login', adminController.verify);

//Dashboard route
adminRoute.get('/dashboard', auth.isLogin, adminController.loadDashboard);

//Delete route
adminRoute.delete('/deleteUser', auth.isLogin, adminController.deleteUser);

//UserEdit route
adminRoute.get('/editUser', auth.isLogin, adminController.loadEdit);

//edit user
adminRoute.post('/userEdit', auth.isLogin, adminController.userEdit)

//Add User route
adminRoute.get('/adduser', auth.isLogin, adminController.loadAddUser);

//Logout route
adminRoute.get('/logout', auth.isLogin, adminController.logout);


adminRoute.get('*', (req, res) => {

    res.redirect('/admin')

})

module.exports = adminRoute;
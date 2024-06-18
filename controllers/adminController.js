const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const { search } = require('../router/adminRouter');


const loadLogin = async (req, res) => {
  try {
    res.render("adminlog");
  } catch (err) {
    console.log(err);
  }
};

const verify = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      res.status(400).json({
        message: "Admin not found",
      });
      return;
    }
    if(admin.password == req.body.password){
      req.session.admin = admin._id;
      res.sendStatus(200);
    }
    else{
      res.status(400).json({message: 'Incorrect password'})
    }
  } catch (err) {
    console.log(err);
  }
};

const loadDashboard = async (req, res) => {
  try{
    const admin = await Admin.findById(req.session.admin)
    let search = req.query.search;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }
    const users = await User.find(query)
    res.render('admindashbord', {admin: admin, users: users, search: search})
  }
  catch(err){
    console.log(err)
  }
}

const loadAddUser = async (req ,res) =>{
  try {
    res.render('adduser')
    
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req,res)=>{
  try {
    const id = req.query.userId;
    await User.deleteOne({_id:id});
    if(req.session.user == req.query.userId){
      delete req.session.user;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

const userEdit = async (req,res) =>{
  try {
      console.log(req.body)
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
      res.status(400).json({message: 'User already exist'});
      return;
    }
    const phoneExist = await User.findOne({phone: req.body.phone});
    if(phoneExist){
      res.status(400).json({message: 'Phone already exist'});
      return;
    }

    const update = await User.findByIdAndUpdate(req.body.userId,
      {
        $set:
        {
          name:req.body.name, 
          email:req.body.email, 
          phone:req.body.phone
        }
      });

      res.sendStatus(200);
  }catch(err){
    console.log(err)
  }
}





const loadEdit = async (req,res) => {
  try {
    const user = await User.findById(req.query.userId)
    res.render('adminEdit', {user: user});
  }catch(err){
     console.log(err)
  }
}


const logout = async (req, res) => {
  try{
    delete req.session.admin;
    res.redirect('/admin/login')
  }
  catch(err){
    console.log(err)
  }
}


module.exports = {
  loadLogin,
  verify,
  loadDashboard,
  logout,
  deleteUser,
  loadAddUser,
  loadEdit,
  userEdit

};

const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const { message } = require('statuses');


const securePassword = async (password) => {
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
  }
  catch(err){
    console.log(err)
  }
}

const loadRegister = async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
  }
};

const insertUser = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(400).json({ message: "User already exist" });
      return;
    }
    const phoneExist = await User.findOne({phone: req.body.phone});
    if(phoneExist){
      res.status(400).json({message: 'Phone already exist'});
      return;
    }
    const password = await securePassword(req.body.password)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      phone: req.body.phone,
    });
    const userData = await user.save();
    if (userData) {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
};


const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};

const verify = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(passwordCorrect){
      req.session.user = user._id;
      res.sendStatus(200);
    }
    else{
      res.status(400).json({message: 'Incorrect password'})
    }
  } catch (err) {
    console.log(err);
  }
};

const loadHome = async (req, res) => {
  try{
    const user = await User.findById(req.session.user)
    res.render('home', {user: user})
  }
  catch(err){
    console.log(err)
  }
}

const loadEdit = async (req,res) => {
  try {
    const user = await User.findById(req.session.user)
    res.render('userEdit', {user: user});
  }catch(err){
     console.log(err)
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

const logout = async (req, res) => {
  try{
    delete req.session.user;
    res.redirect('/login')
  }
  catch(err){
    console.log(err)
  }
}


module.exports = {
  loadRegister,
  insertUser,
  loadLogin,
  verify,
  loadHome,
  logout,
  loadEdit,
  userEdit,

};

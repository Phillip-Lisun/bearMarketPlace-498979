const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bearmp-user:oESJcxN6ERfNwkjT@cluster0.mqdocjh.mongodb.net/bearmp?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const multer = require("multer");
const upload = multer({ dest: "./public/images" });

const saltRounds = 10;


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded());

mongoConnect().catch(err => console.log(err));

async function mongoConnect() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB!");
}


app.get("/api", (req, res) => {
    res.json(message);
  });

app.post("/api/register", async function (req, res) {
    let data = req.body;

    let userInsertResult = await userInsert(data);

    if(userInsertResult === "email") {
      res.json({success: false, type: "Email"});
    }
    if(userInsertResult === "inserted") {
      res.json({success: "true"});
    }
    

});

app.post("/api/login", async function (req, res) {
  let data = req.body;

  let loginCheck = await loginAttempt(data);

  if(loginCheck === false) {
    res.json({success: false});
  }
  if(loginCheck === true) {
    res.json({success: "true"});
  }
  

});

app.post("/api/marketplace/create-sell", async function (req, res) {
  let data = req.body;
  console.log(data);
  res.json({success:true});

});

app.post("/api/marketplace/create-sell/images", upload.array('images'),  async function (req, res) {
  let data = req.files;
  console.log(data);
  res.json({success:true});

});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});

async function userInsert(data) {

  let pwd = data.pwd;
  pwd = await pwdHash(pwd);
  
  let duplicate = await checkEmailExist(data.email + "");

  if(duplicate == true) {
    return "email";
  }
  else {
    const addUser = await User.create({
      name: [{firstName: data.firstName + "", lastName: data.lastName + ""}],
      username: data.username + "",
      email: data.email + "",
      password: pwd + "",
   });
   return "inserted";

  }
}

async function checkEmailExist(email) {
  
    const userExists = await User.exists({email: email + ""});
    if(userExists != null) {
      return true;
    }
    else {
      return false;
    }

}

async function pwdHash(pwd) {

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(pwd, salt);
  return hash;


}

async function loginAttempt(data) {
  let name = "";
  let pwdHash = "";
  let username = "";

  let email = data.email;
  let pwd = data.pwd;

  if(checkEmailExist(email) === false) {
    return false;
  } 

  userCheck = await User.findOne({'email': email}, 'username password name').exec();

  if(userCheck != null) {
    name = userCheck.name;
    pwdHash = userCheck.password;
    username = userCheck.username;
  }
 

  const pwdResult = await bcrypt.compareSync(pwd, pwdHash); 

  if(pwdResult === false) {
    return false;
  }
  if(pwdResult === true) {
    return true;
  }






}

//mongoose schema 

const userSchema = new mongoose.Schema({
    name: [{
      firstName: String,
      lastName: String
    }],
    username: String,
    email: String,
    password: String

});

const User = mongoose.model('User', userSchema, 'users');
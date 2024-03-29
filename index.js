require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();
const uri = process.env.MONGO_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const multer = require("multer");
const e = require('express');

//Configuration for Multer copied code beginning https://www.section.io/engineering-education/uploading-files-using-multer-nodejs/
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
}); // copied code end

const upload = multer({ storage: multerStorage });

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

let currentToken = "";


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
    res.json({success: "true", token: currentToken});
  }
  

});

app.post("/api/marketplace/create-sell", async function (req, res) {
  let data = req.body;

  // console.log(currentUserEmail + " " + data.email);
  if(await forgery(data.email, data.token) == false) {
    res.send("Forgery Detected");
    return;
  }
  
  if(checkLogIn(data.email) != false) {
    if(await itemInsert(data) == true){
      console.log("Item inserted");
      res.json({success:true});
    }
    else {
      res.json({success:false});
    }
  }
  else {
    res.json({success:false});
  }

});

app.post("/api/marketplace/create-sell/images", upload.array('images'),  async function (req, res) {
  let files = Array.from(req.files);
  let postData = req.body;

  if(files.length > 0) {
    let fileNames = [];

    for(let i = 0; i < files.length; i++) {
      fileNames.push(files[i].filename);
    }

    let added = await insertImages(fileNames, postData);

    if(added === true) {
      res.json({success:true});
    }
    else {
      res.json({success:false});
    }
  }

});

app.post("/api/marketplace", async function (req, res) {
  let data = req.body;

  let startIndex = data.startIndex;
  let endIndex = startIndex + 200;

  let query = SellItem.find().skip(startIndex).limit(endIndex);
  let itemList = await query.exec();

  // console.log(itemList);

  res.json(itemList);


});



app.post("/api/marketplace/view-item", async function (req, res) {
  let data = req.body;

  let itemId = data.itemId;

  let query = SellItem.findOne({'_id': itemId});
  let item = await query.exec();

  // console.log(itemList);

  res.json(item);


});

app.post("/api/marketplace/my-items", async function (req, res) {
  let data = req.body;

  let startIndex = data.startIndex;
  let endIndex = startIndex + 200;

  let query = SellItem.find({'email': data.email}).skip(startIndex).limit(endIndex);
  let itemList = await query.exec();

  // console.log(itemList);

  res.json(itemList);


});

app.post("/api/marketplace/my-items/delete", async function (req, res) {
  let data = req.body;

  if(await forgery(data.email, data.token) == false) {
    res.send("Forgery Detected");
    return;
  }

  let itemId = data.itemId;

  let query = SellItem.deleteOne({'_id': itemId});
  let item = await query.exec();

  if(item == 1) {
    res.json({'success': true});
  }
  else {
    res.json({'success': false});
  }

});

app.post("/api/marketplace/edit-sell", async function (req, res) {
  let data = req.body;

  // console.log(currentUserEmail + " " + data.email);

  if(await forgery(data.email, data.token) == false) {
    res.send("Forgery Detected");
    return;
  }

  
  if(checkLogIn(data.email)) {
    if(await itemEdit(data) == true){
      console.log("Item Edited");
      res.json({success:true});
    }
    else {
      res.json({success:false});
    }
  }
  else {
    res.json({success:false});
  }

});

app.post("/api/marketplace/edit-sell/images", upload.array('images'),  async function (req, res) {
  let files = Array.from(req.files);
  let postData = req.body;

  if(files.length > 0) {
    let fileNames = [];

    for(let i = 0; i < files.length; i++) {
      fileNames.push(files[i].filename);
    }

    let added = await insertImages(fileNames, postData);

    if(added === true) {
      res.json({success:true});
    }
    else {
      res.json({success:false});
    }
  }

});

app.post("/api/marketplace/edit-item/getInfo", async function (req, res) {
  let data = req.body;

  let query = SellItem.findOne({'email': data.email, '_id': data.itemId});
  let item = await query.exec();

  // console.log(itemList);

  res.json(item);


});

app.post("/api/marketplace/buy-item", async function (req, res) {
  let data = req.body;
  
  if(checkLogIn(data.email) != false) {
    if(await buyRequest(data) == true){
      console.log("Buy Request");
      res.json({success:true});
    }
    else {
      res.json({success:false});
    }
  }
  else {
    res.json({success:false});
  }

});

app.post("/api/marketplace/logout", async function (req, res) {

    let data = req.body;
    let email = data.email;

    let logInCheck = await checkLogIn(data.email);
    
    if(logInCheck != false) {
      //console.log(logInCheck);
      if(data.token != logInCheck) {
        res.json({success: false, message: "forgery detected"});
      }
      else {
        logOutUser = await logIn.deleteOne({"email": email}).exec();
        if(logOutUser != null) {
          res.json({success:true});
        }
      }
    }
    else {
        res.json({success:false});

    }




});



app.listen(port, () => {
    console.log('Listening on port: ' + port)
});

async function checkLogIn(email) {

  logInCheck = await logIn.findOne({'email': email}, 'token').exec();

  if(logInCheck != null) {
    return logInCheck.token;
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

async function forgery(email, token) {

  let setToken = await logIn.findOne({'email': email}, "token").exec();


  if(token != setToken.token || setToken == null) {
    return false;
  }
  else {
    return true;
  }

}

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

    let temp = "token";
    const salt = bcrypt.genSaltSync(saltRounds);
    let tempToken = bcrypt.hashSync(temp, salt);
    currentToken = tempToken;

    const logInUser = await logIn.create({
      email: email,
      token: tempToken
    });

    if(logInUser != null) {
      return true;
    }
    else {
      return false;
    }

    // currentUsername = userCheck.username;
    // currentUserEmail = email;


    // const salt = bcrypt.genSaltSync(saltRounds);
    // currentToken = bcrypt.hashSync(temp, salt);
    // console.log(currentUsername + " " + currentUserEmail);
    // return true;
  }


}

async function itemInsert(data) {

  let usernamePull = await User.findOne({"email": data.email}, 'username').exec();
  let username = usernamePull.username;
  

  const addItem = await SellItem.create({
    title: data.title,
    description: data.description,
    price: data.price,
    payPref: data.payPref,
    username: username,
    email: data.email
  });
  // console.log(addItem);


  if(addItem != null) {
    return true;
  }
  else {
    return false;
  }

}

async function insertImages(imageNames, data) {

  let post = await SellItem.findOne({title: data.title, description: data.description, email: data.email});

  if(post != null) {
    post.imageRef = imageNames;

    await post.save();
  
    return true;
  

  }
  else {
    return false;
  }

}

async function itemEdit(data) {

  let post = await SellItem.findOne({_id: data.itemId, email: data.email});

  if(post != null) {

    post.title = data.title,
    post.description = data.description,
    post.price = data.price,
    post.payPref = data.payPref,

    await post.save();
  
    return true;
  
  }
  else {
    return false;
  }
  
}

async function buyRequest(data) {

  let post = await SellItem.findOne({_id: data.itemId});

  if(post != null) {

    post.buyRequest.push(data.buyerEmail);

    await post.save();
  
    return true;
  
  }
  else {
    return false;
  }
  
}


//mongoose schema 

const logInSchema = new mongoose.Schema ({
    email: String,
    token: String
});

const userSchema = new mongoose.Schema({
    name: [{
      firstName: String,
      lastName: String
    }],
    username: String,
    email: String,
    password: String

});

const sellPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  payPref: String,
  imageRef: [String],
  username: String,
  email: String,
  buyRequest: [String]

});

const User = mongoose.model('User', userSchema, 'users');
const SellItem = mongoose.model('SellItem', sellPostSchema, 'sellItems');
const logIn = mongoose.model('logIn', logInSchema, 'loggedInUsers');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();
const cors = require('cors')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
//   app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    let message = ["message1", "message2"];
    res.json(message);
  });

app.post("/register", (req, res) => {
    res.send("It works!");
    console.log("Post data recieved");
});


app.listen(port, () => {
    console.log('Listening on port ${port}')
});
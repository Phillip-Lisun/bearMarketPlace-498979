const express = require('express');
const app = express();
const port = 3456;
const path = require('path');
const router = express.Router();
const cors = require('cors')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));

var corsOptions = {
    origin: "http://localhost:3456"
  };
  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/register", (req, res) => {
    let message = ["message1", "message2"];
    res.json(message);
  });


app.listen(port, () => {
    console.log('Listening on port ${port}')
});
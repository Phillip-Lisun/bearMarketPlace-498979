const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bearmp-user:oESJcxN6ERfNwkjT@cluster0.mqdocjh.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded());

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
//   app.use(cors(corsOptions));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.get("/api", (req, res) => {
    let message = ["message1", "message2"];
    res.json(message);
  });

app.post("/api/register", (req, res) => {
    console.log("Post data recieved");
    console.log(req.body);
});

app.listen(port, () => {
    console.log('Listening on port ${port}')
});
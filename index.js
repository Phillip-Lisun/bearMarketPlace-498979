const express = require('express');
const app = express();
const port = 3456;
const router = express.Router();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("test");
});

app.listen(port, () => {
    console.log('Listening on port ${port}')
});
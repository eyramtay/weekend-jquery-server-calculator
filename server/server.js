const express = require('express');

const app = express();

app.use(express.static('server/public'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// Global Array of numbers
const numbersArray = []

app.get('/numbers', (req, res) => {
    console.log('Request for numbers...', numbersArray);

    res.send(numbersArray);
})

app.post('/numbers', (req, res) => {
    let newNumbers = req.body;
    console.log('Got a new number', numbersArray);
    numbersArray.push(newNumbers);
    res.sendStatus(201);
})

// tell our server to listen on a port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
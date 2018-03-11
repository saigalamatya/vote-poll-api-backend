const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const jwt = require('jsonwebtoken');
var config = require('./config/config');

const mongoose = require('./db/db');
const routes = require('./routes/routes');

var app = express();
const port = 5555;

app.set('superSecret', config.secret);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//cors middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api', routes);



app.listen(port, () => {
    console.log(`Go to localhost:${port}`);
});

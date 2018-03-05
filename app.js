const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/db');
const routes = require('./routes/routes');

var app = express();

app.use(bodyParser.json());

//cors middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api', routes);

const port = 5555;

app.listen(port, () => {
    console.log(`Go to localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/db');
const routes = require('./routes/routes');

var app = express();

app.use(bodyParser.json());

app.use('/api', routes);

const port = 5555;

app.listen(port, () => {
    console.log(`Go to localhost:${port}`);
});
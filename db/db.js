const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/voting_poll");
mongoose.Promise = global.Promise;

mongoose.connection.on('connect', () => {
    console.log("Database connected successfully!!!");
});

mongoose.connection.on('error', (error) => {
   console.log("Database connection unsuccessful!!!", error); 
});

module.exports = mongoose;
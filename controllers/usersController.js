const router = require('express').Router();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const Users = require('../models/users');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/', (req, res) => {
    console.log("Inside /create user");

    var user = new Users({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    user.save((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Cannot create user",
                error: err
            });
        }

        res.status(200).json({
            message: "User created successfully"
        });
    });

});

router.post('/authenticate', (req, res) => {
    console.log("Inside /POST authenticate", req.body.userName);

    Users.findOne({
        // $and: [
        //     { $and: [{ userName: req.body.userName }] },
        //     { $and: [{ password: req.body.password }] }
        // ]

        // $and:[
        //     { userName: req.body.userName },
        //     { password: bcrypt.hashSync(req.body.password, 10) }
        // ]
        userName: req.body.userName,
        // password: bcrypt.hashSync(req.body.password, 10)
    }, (err, user) => {
        console.log("userdcxsda", user)
        if (err) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
                err: err
            })
        }
        if (!user) {
            // console.log("user not found", user)
            return res.status(500).json({
                success: false,
                message: "Authentication failed. User not found!",
                error: err
            });
        }
        console.log("user password",req.body.password);

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log("user", user);
            return res.json({
                success: false,
                message: "Authentication failed. Password Mismatch!!!"
            });
            
        }

        console.log("User Authentication Successful!!!");

        const payload = {
            userName: user.userName
        };

        var token = jwt.sign(payload, config.secret, {
            expiresIn: "2 days"
        });

        // return the info icluding token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    
    });

});


// Middleware
router.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        // if no token
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


router.get('/', (req, res) => {
    console.log("Inside /GET users");

    Users.findOne({}, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: "Cannot /GET users",
                error: err
            });
        }

        res.status(200).json({
            message: "/GET users successful",
            obj: [{
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                // password: user.password,
                id: user._id
            }]
        });
    });

});

module.exports = router;
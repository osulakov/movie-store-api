const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

exports.userSignup = (req, res, next) => {
    console.log('userSignup')
    try {
        //check if user already exists with this email
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) { 
                    res.status(409).json({
                        message: 'This email already exists'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => { 
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        console.log('signup')
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                token = jwt.sign(
                                    { 
                                        name: user.name,
                                        email: user.email,
                                        userId: user._id
                                    }, 
                                    'secret',
                                    {  
                                        expiresIn: "1h"
                                    });
                                res.status(201).json({
                                    message: 'User created',
                                    token: token
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({error: err});
                            });
                        }
                    }); 
                }
            })

    } catch (error) {
        return res.status(401).json({
            message: 'You cannot create new user as: ',
            error: error
        });
    }
}

exports.userLogin = (req, res, next) => {
    
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result) {
                    const token = jwt.sign(
                        { 
                            name: user[0].name,
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        'secret',
                        {  
                            expiresIn: "1h"
                        })

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}
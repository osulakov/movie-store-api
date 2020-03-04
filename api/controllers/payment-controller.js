const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Payment = require('../models/payment');
const Ticket = require('../models/ticket'); 

module.exports.newPayment = (req, res, next) => {
    const movieId = req.body.movieId;
    const movieName = req.body.movieName;
    const amount = req.body.amount;
    
    let token = req.headers.authorization;
    token = token.split(" ");
    token = token[1];
    let decoded = jwt.decode(token);
    let userId = decoded.userId;
    

    const payment = new Payment({
        _id: new mongoose.Types.ObjectId(),
        date: new Date(),
        movieId: movieId,
        movieName: movieName,
        userId: userId,
        amount: amount
    })
    
    payment
        .save()
        .then(result => {
            
            const ticket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                movieId: movieId,
                movieName: movieName,
                userId: userId,
                amount: amount
            })
            console.log(ticket)
            ticket
                .save()
                .then(tick => {
                    res.status(200).json({
                        message: 'Your payment was successfull. Get your ticket',
                        movie: movieName,
                        amount: amount,
                        results: tick
                    })
                })
                .catch(err => {
                    res.status(500).json(
                        {
                            error: err,
                            message: 'Something went wrong, we cannot get ticket for you.'
                        });
                });

        })
}
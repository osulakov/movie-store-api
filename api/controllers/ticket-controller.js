const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Ticket = require('../models/ticket'); 

module.exports.getAllTickets = (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ");
    token = token[1];
    let decoded = jwt.decode(token);
    let userId = decoded.userId;

    Ticket.find({'userId': userId})
        .exec()
        .then(docs => {
            if(docs !== undefined || docs.length > 0) {
                res.status(200).json({
                    message: 'All tickets for the user',
                    tickets: docs
                })
            } else {
                res.status(200).json(
                    {
                        message: 'You do not have any ticket yet.'
                    });
            }
        })
        .catch(err => {
            res.status(500).json(
                {
                    error: err,
                    message: 'Something went wrong, we cannot get your tickets.'
                });
        });
}
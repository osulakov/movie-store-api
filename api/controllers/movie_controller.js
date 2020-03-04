const mongoose = require('mongoose');

const Movie = require('../models/movie');

module.exports.addNewMovie = (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        year: req.body.year,
        producer: req.body.producer,
        imageUrl: req.file.path,
        description: req.body.description,
        price: req.body.price
    })

    movie   
        .save()
        .then((result) => {
            res.status(200).json({
                message: 'New movie saved successfully.',
                result: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                req: req.body
            })
        })
}

module.exports.getAllMovies = (req, res, next) => {
    Movie.find()
        .exec()
        .then(docs => {
            if(docs !== undefined) {
                res.status(200).json({
                    count: docs.length,
                    movies: docs
                })
            } else {
                res.status(200).json({
                    message: "We do not have any movie for now."
                })
            }
        })
        .catch(err =>{
            res.status(500).json({
                message: "Something went wrong.",
                error: err
            })
        })
}

module.exports.getOneMovie = (req, res, next) => {
    let id = req.body._id
    Movie.find({_id: id})
        .exec()
        .then(result => {
            if(result !== undefined || result.length !== 0) {
                res.status(200).json({
                    message: 'We found your movie successfully.',
                    movie: result[0]
                })
            } else {
                res.status(201).json({
                    message: 'We could not find any record in the data base.'
                })
            }
        })
        .catch(err =>{
            res.status(500).json({
                message: "Something went wrong.",
                error: err
            })
        })
}
const mongoose = require('mongoose'); 


const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    year: { type: String, required: true },
    producer: { type: String, required: true },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: String, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
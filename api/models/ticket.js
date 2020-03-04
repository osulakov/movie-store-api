const mongoose = require('mongoose'); 


const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movieId: { type: String, required: true },
    movieName: { type: String, required: false },
    userId: { type: String, required: true },
    amount: { type: String, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);
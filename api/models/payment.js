const mongoose = require('mongoose'); 


const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true },
    movieId: { type: String, required: true },
    movieName: { type: String, required: false },
    userId: { type: String, required: true },
    amount: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./api/routes/user-route');
const movieRoutes = require('./api/routes/movie-route');
const paymentRoutes = require('./api/routes/payment-route');
const ticketRoutes = require('./api/routes/ticket-route');



mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/movies-store-db', {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to mongo db movies-store-db')
})

db.on('error', () => {
    console.log('Cannot connect to mongo db')
})

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))

//app.use(cors());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ticket', ticketRoutes);

app.use((req, res, next) => {
    const error = new Error('This url is not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;


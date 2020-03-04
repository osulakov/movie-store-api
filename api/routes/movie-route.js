const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const MovieController = require('../controllers/movie_controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('storage-dest')
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        console.log('storage')
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log('fileFilter')
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: storage,
    imits: {
        filesize: 1024 * 1024 * 5 //limit 5 MB
    },
    fileFilter: fileFilter
})

router.get('/', MovieController.getAllMovies);
router.post('/', MovieController.getOneMovie);
router.post('/add', upload.single('movieImage'), MovieController.addNewMovie);

module.exports = router;
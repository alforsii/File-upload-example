const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/picture');

/* GET home page */
router.get('/', (req, res, next) => {
  Picture.find()
    .then(pictures => {
      res.render('index', { pictures });
    })
    .catch(error => {
      next(error);
    });
});

// Route to upload from project base path
const upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('photo'), (req, res, next) => {
  const picture = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
  });

  picture
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      next(error);
    });
});

module.exports = router;

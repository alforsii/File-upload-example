const express = require('express');
const router = express.Router();
const Dragon = require('../../models/Dragon.model');
const uploadCloud = require('../../config/cloudinary.config');

//Dragon home page
router.get('/', (req, res, next) => {
  Dragon.find()
    .then(dragonsFromDB => {
      res.render('dragon-views/dragon-home', { dragons: dragonsFromDB });
    })
    .catch(err => console.log(err));
});

router.post('/create', uploadCloud.single('image'), (req, res, next) => {
  console.log('dragonInput: ', { body: req.body, file: req.file });
  const dragonInput = req.body;
  dragonInput.image = req.file.url;
  Dragon.create(dragonInput)
    .then(responseFromDB => {
      console.log(responseFromDB);
      res.redirect('back');
    })
    .catch(err => next(err));
});

module.exports = router;

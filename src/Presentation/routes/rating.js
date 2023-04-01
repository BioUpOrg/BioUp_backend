const express = require('express');
const router = express.Router();
const ratingModel = require('../../Infrastructure/Models/productModel');
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.addRating);
router.get('/', ratingController.getRatings);
router.get('/:id', ratingController.getRating);
router.patch('/:id' ,ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);






router.get('/', function(req, res, next) {
  res.send('products list page !');
});

module.exports = router;

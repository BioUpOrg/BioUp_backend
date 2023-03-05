const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);

router.get('/', function(req, res, next) {
  res.send('products list page !');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlwares/auth');
const User = require('../../Infrastructure/Models/userModel');


//Create New User
router.post('/auth/', userController.addUser);









router.get('/', function(req, res, next) {
  res.send('users list page !');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlwares/auth');
const User = require('../../Infrastructure/Models/userModel');


//Create New User
router.post('/auth/', userController.addUser);




//Get all users
router.get('/list',auth,userController.getUsersList)

//Consult User
router.get('/:_id',auth, userController.getUserById);

router.get('/', function(req, res, next) {
  res.send('users list page !');
});

module.exports = router;

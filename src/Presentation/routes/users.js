const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/updateactivationcode/:mail',userController.sendActivateCodeMail);
router.get('/check/activate/account/:token',userController.verifyAccountMail);
router.get('/', function(req, res, next) {
  res.send('users list page !');
});

module.exports = router;

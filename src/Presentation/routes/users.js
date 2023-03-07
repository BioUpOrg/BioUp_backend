const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlwares/auth');
const User = require('../../Infrastructure/Models/userModel');

router.put('/updateactivationcode/:mail',userController.sendActivateCodeMail);
router.get('/check/activate/account/:token',userController.verifyAccountMail);
router.put('/updateactivationcodesms/:phone',userController.sendActivateCodeSmS);
router.get('/check/activate/accountsms/:smscode',userController.verifyAccountSms);
router.put('/updateCodeRecupPassBySms/:phone',userController.sendCodeRecBySms);
router.get('/check/activate/codeRecupPassBySms/',userController.verifyCodeRecBySms);
router.put('/changepassword/',userController.changePass);
router.get('/', function(req, res, next) {
  res.send('users list page !');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const forgetPasswordMail = require('../controllers/ForgetPasswordMail');

router.put('/' , forgetPasswordMail.sendps);
router.put('/verif',forgetPasswordMail.verifps, );
router.put('/changeps', forgetPasswordMail.changeps);

module.exports = router;

//
//
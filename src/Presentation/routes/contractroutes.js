const express = require('express');
const router = express.Router();

const contractController =require('../controllers/contract'); 

router.post('/addnewContract/',contractController.addContract);
router.get('/getUserContract/:userid',contractController.FindContractByUserID);
router.put('/saveUserSignature/',contractController.saveSignaturecontroller);
module.exports = router;


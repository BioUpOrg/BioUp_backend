const express = require('express');
const router = express.Router();

const contractController =require('../controllers/contract'); 

router.post('/addnewContract/',contractController.addContract);
router.get('/getUserContract/:userid',contractController.FindContractByUserID);
module.exports = router;


const express = require('express');
const router = express.Router();

const contractController =require('../controllers/contract'); 

router.post('/addnewContract',contractController.addContract);
module.exports = router;


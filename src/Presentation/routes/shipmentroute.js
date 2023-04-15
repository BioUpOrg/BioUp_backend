const express = require('express');
const router = express.Router();

const shipmentController =require('../controllers/shipmentController'); 

router.get('/listnotDelivred',shipmentController.findCommandesNotDelivered);
router.post('/addnewShipment',shipmentController.addShipment);
module.exports = router;
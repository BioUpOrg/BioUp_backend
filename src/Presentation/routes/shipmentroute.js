const express = require('express');
const router = express.Router();

const shipmentController =require('../controllers/shipmentController'); 

router.get('/listnotDelivred',shipmentController.findCommandesNotDelivered);
router.post('/addnewShipment',shipmentController.addShipment);
router.get('/MyMission/:id',shipmentController.getMyshipment);
router.put('/updateMylocation/:agent_id',shipmentController.updateMylocation);
module.exports = router;
const express = require('express');
const router = express.Router();
const commandsController = require('../controllers/commandsController');
const auth = require('../middlwares/auth');

//Add new command
router.post('/', auth,commandsController.addCommand);



module.exports = router;

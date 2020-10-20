const express = require('express');
const router = express.Router();
const duserController = require('../controller/dashboard-user.controller');



router.get('/users', duserController.getList);
router.post('/user/:id', duserController.edit);



module.exports = router;
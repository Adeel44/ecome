const express = require('express');
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const drequestController = require('../controller/dashboard-request.controller');


router.get('/request', isAuth,  drequestController.getList);

router.put('/request/:id', isAuth,  drequestController.edit)


module.exports = router;
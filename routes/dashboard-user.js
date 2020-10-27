const express = require('express');
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const duserController = require('../controller/dashboard-user.controller');



router.get('/users', isAuth, duserController.getList);
router.post('/user/:id', isAuth,  duserController.edit);



module.exports = router;
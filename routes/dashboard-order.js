const express = require('express')
const router = express.Router();
const isAuth = require("../middleware/is-auth");


const dorderController = require('../controller/dashboard-order.controller');



router.get('/orders',  isAuth,   dorderController.getList);
router.post('/add-order', isAuth,  dorderController.create);
router.get('/order/:id', isAuth, dorderController.delete );
router.post('/order/:id', isAuth,  dorderController.edit );




module.exports = router;
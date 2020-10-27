const express = require('express')
const router = express.Router();
const dprouctController = require('../controller/dashboard-product.controller');
const isAuth = require("../middleware/is-auth");




router.get('/products', isAuth,  dprouctController.getList);
router.post('/add', isAuth, dprouctController.create);
router.get('/product/:id', isAuth, dprouctController.delete );
router.post('/product/:id', isAuth,  dprouctController.edit );



module.exports = router;
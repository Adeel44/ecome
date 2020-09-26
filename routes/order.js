const express = require('express')
const router = express.Router();

const User = require('../model/user')

const { decreaseQuantity } = require("../controller/product.controller");

const authcontroller = require('../controller/auth.controller');




const orderController = require('../controller/order.controller');

router.post('/create',   orderController.create);


 router.get('/list',   orderController.listOrders);

router.get('/:id',   orderController.orderById);

//  router.put('/:id',   productController.update);
// router.delete('/:id',  productController.deletedProduct);


module.exports = router;
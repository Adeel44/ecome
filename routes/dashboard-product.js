const express = require('express')
const router = express.Router();
const dprouctController = require('../controller/dashboard-product.controller');



router.get('/products',   dprouctController.getList);
router.post('/add',  dprouctController.create);
router.get('/product/:id', dprouctController.delete );
router.post('/product/:id', dprouctController.edit );



module.exports = router;
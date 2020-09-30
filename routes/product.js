const express = require('express')
const router = express.Router();


const productController = require('../controller/product.controller');
router.post('/create',   productController.create);

router.get('/list',   productController.list);

router.get('/:id',   productController.productById);

router.put('/:id',   productController.update);
router.delete('/:id',  productController.deletedProduct);


module.exports = router;

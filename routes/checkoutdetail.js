const express = require('express')
const router = express.Router();


const checkoutController = require('../controller/checkoutdetail.controller');
router.post('/create',   checkoutController.create);
router.get('/list',   checkoutController.list);
router.get('/:id',   checkoutController.findById);
router.put('/:id',   checkoutController.update);
router.delete('/:id',  checkoutController.delete);


module.exports = router;

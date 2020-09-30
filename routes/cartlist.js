const express = require('express')
const router = express.Router();
const verify = require('../middleware/verifyToken')

const cartlistController = require('../controller/cartlist.controller');

router.post('/create',  verify, cartlistController.create);
router.get('/list',  verify,  cartlistController.list);
router.get('/:id',  verify,   cartlistController.findById);
router.put('/:id',  verify,   cartlistController.update);
router.delete('/:id',  verify,  cartlistController.delete);


module.exports = router;
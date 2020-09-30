const express = require('express')
const router = express.Router();

const verify = require('../middleware/verifyToken')


const categoryController = require('../controller/category.controller');
router.post('/create', verify,  categoryController.create);
router.get('/list',  verify, categoryController.list);
router.get('/:id',  verify, categoryController.findById);
router.put('/:id',  verify, categoryController.update);
router.delete('/:id',  verify, categoryController.delete);


module.exports = router;


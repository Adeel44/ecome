const express = require('express')
const router = express.Router();


const categoryController = require('../controller/category.controller');
router.post('/create',   categoryController.create);
router.get('/list',   categoryController.list);
router.get('/:id',   categoryController.categoryById);
 router.put('/:id',   categoryController.update);
//router.delete('/:id',verify,  attendanceController.delete);


module.exports = router;


const express = require('express');
const router = express.Router();
const isAuth = require("../middleware/is-auth");


const dcategoryController = require('../controller/dashboard-category.controller');



router.get('/categories',  isAuth,   dcategoryController.getList);
router.post('/add-category',  isAuth,  dcategoryController.create);
router.get('/category/:id', isAuth, dcategoryController.delete );
router.post('/category/:id', isAuth, dcategoryController.edit );




module.exports = router;
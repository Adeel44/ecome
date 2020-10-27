const express = require('express')
const router = express.Router();
const isAuth = require("../middleware/is-auth");


const dpaymentController = require('../controller/dashboard-payment.controller');



router.get('/payments', isAuth,  dpaymentController.getList);
router.post('/add-payment', isAuth,  dpaymentController.create);
router.get('/payment/:id', isAuth,  dpaymentController.delete );
router.post('/payment/:id', isAuth,  dpaymentController.edit );



module.exports = router;
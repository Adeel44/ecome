const express = require('express')
const router = express.Router();

const dpaymentController = require('../controller/dashboard-payment.controller');



router.get('/payments',   dpaymentController.getList);
router.post('/add-payment',  dpaymentController.create);
router.get('/payment/:id', dpaymentController.delete );
router.post('/payment/:id', dpaymentController.edit );



module.exports = router;
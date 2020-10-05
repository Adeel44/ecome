var express = require('express');
var router = express.Router();
const verify = require('../middleware/verifyToken')
const admincontroller = require('../controller/admin.controller');



router.post('/register', admincontroller.register);
router.post('/login', admincontroller.login);

// router.get('/posts', verify, authcontroller.verify_posts );




module.exports = router;

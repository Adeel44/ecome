var express = require('express');
var router = express.Router();
const verify = require('../middleware/verifyToken')

const { isClient, isAdmin } = require("../middleware/isadmin");
const admincontroller = require('../controller/admin.controller');





router.post('/register', admincontroller.register);
router.post('/login', isAdmin , admincontroller.login);


// router.get('/posts', verify, admincontroller.verify_posts );






module.exports = router;

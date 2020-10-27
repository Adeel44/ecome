var express = require('express');
var router = express.Router();
const verify = require('../middleware/verifyToken')
const isAuth = require("../middleware/is-auth");



const { isClient, isAdmin } = require("../middleware/isadmin");
const adcontroller = require('../controller/ad.controller');





router.post('/register', adcontroller.register);
router.post('/login', isAdmin , adcontroller.login);




// router.get('/posts', verify, admincontroller.verify_posts );






module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const drequestController = require('../controller/dashboard-request.controller');


router.get('/request', drequestController.getList);

router.put('/request/:id', drequestController.edit)


// router.get('/request', (req, res)=>{ 

//     User.find()
//         .then(user =>
//             res.render("request", {
//                 user: user,
//                 path: "/request",
//             })
//         )
//         .catch(err=>console.log(err))
    
// })

// router.put('/request/:id', async (req, res) => {
//     const { id } = req.params;
//     await User.findByIdAndUpdate( {_id:id} , req.body);
    
//     res.redirect('/request');
// })


module.exports = router;
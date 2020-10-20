const express = require('express')
const router = express.Router();

const dorderController = require('../controller/dashboard-order.controller');



router.get('/orders',   dorderController.getList);
router.post('/add-order',  dorderController.create);
router.get('/order/:id', dorderController.delete );
router.post('/order/:id', dorderController.edit );


// router.get('/orders', (req, res)=>{ 

//     Order.find()
//         .then(order =>
//             res.render("orders", {
//                 order: order,
//                 path: "/orders",
//             })
//         )
//         .catch(err=>console.log(err))
    
// })



// router.post('/add-order', async (req, res) => {
//     const order = new Order(req.body);
//     await order.save();
//     res.redirect('/orders');
//   })

// router.get('/order/delete/:id', (req, res)=>{ 

//     let id = req.params.id;

//     Order.findByIdAndDelete({_id: id})
//     .then(() => res.redirect("/orders"))
//     .catch(err=>console.log(err))

// })


// router.post('/order/edit/:id', async (req, res) => {
//     const { id } = req.params;
//     await Order.findOneAndUpdate({_id:id} , req.body);
    
//     res.redirect('/orders');
// })





module.exports = router;
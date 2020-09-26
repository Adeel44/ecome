const { Order, CartItem } = require('../model/order');

const Product = require('../model/product');

const User = require('../model/user')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.orderById = (req, res) => {
    Order.findById(req.params.id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: "error"
                });
            }
            res.send(order)
           // next();
        });
};

// exports.create = (req, res) => {
//     console.log('CREATE ORDER: ', req.body);
//    // req.body.order.user = req.profile;
//     const order = new Order(req.body.order);
//     order.save((error, data) => {
//         if (error) {
//             return res.status(400).json({
//                 error: "error"
//             });
//         }
//         // send email alert to admin
//         // order.address
//         // order.products.length
//         // order.amount
//         const emailData = {
//             to: 'kaloraat@gmail.com',
//             from: 'noreply@ecommerce.com',
//             subject: `A new order is received`,
//             html: `
//             <p>Customer name:</p>
//             <p>Total products: ${order.products.length}</p>
//             <p>Total cost: ${order.amount}</p>
//             <p>Login to dashboard to the order in detail.</p>
//         `
//         };
//         sgMail.send(emailData);
//         res.json(data);
//     });
// };



module.exports.create = (req, res) => {

    User.findById(req.body.userId)
    .then(user=>{
        if (!user) {
            return res.status(404).json({
              message: "User not found"
            });
           }
           const order = new Order({
            userId: req.body.userId,  
            productId: req.body.productId,
           
            
            user: req.body.userId
                      
            })
        
            order.save()
            .then(data => {
                if (!data || data == null) {
                    return res.status(200).send({
                        message: "Records Not Saved",
                        data: {},
                        status: 'error'
                    });
                }
                res.status(200).send({
                    message: "Record saved successfully",
                    status: 'status',
                    data: data
                })
            })
            .catch(err => {
                let errorObject = error.getErrorMessage(err)
                res.status(errorObject.code).send({ message: errorObject.message, data: {} })
            })
    })
    .catch(err => {
        let errorObject = error.getErrorMessage(err)
        res.status(errorObject.code).send({ message: errorObject.message, data: {} })
    })

}



// exports.create = (req, res) => {

//     console.log('CREATE ORDER: ', req.body);

//     Product.findById(req.body.productId)
//     .then(product => {
//       if (!product) {
//         return res.status(404).json({
//           message: "Product not found"
//         });
//        }
//       const order = new Order({
//        // _id: mongoose.Types.ObjectId(),
//         quantity: req.body.quantity,
//         product: req.body.productId
//       });
//       return order.save();
//     })
//     .then(result => {
//       console.log(result);
//       res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           product: result.product,
//           quantity: result.quantity
//         }
        
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });


//    // req.body.order.user = req.profile;
//     // const order = new Order(req.body.order);
//     // order.save((error, data) => {
//     //     if (error) {
//     //         return res.status(400).json({
//     //             error: "error in order"
//     //         });
//     //     }
        
//     //     const emailData = {
//     //         to: 'adeel99ahmed@gmail.com',
//     //         from: 'noreply@ecommerce.com',
//     //         subject: `A new order is received`,
//     //         html: `
//     //         <p>Customer name:</p>
//     //         <p>Total products: ${order.products.length}</p>
//     //         <p>Total cost: ${order.amount}</p>
//     //         <p>Login to dashboard to the order in detail.</p>
//     //     `
//     //     };
//     //     sgMail.send(emailData);
//     //     res.json(data);
//     // });
// };




// module.exports.create = (req, res) => {

//     const order = new Order(req.body.order)
//     // ({

//     //     name: req.body.name,
//     //     description: req.body.description,
//     //     time: req.body.time,
                  
//     //     })
    
//         order.save()
//         .then(data => {
//             if (!data || data == null) {
//                 return res.status(200).send({
//                     message: "Records Not Saved",
//                     data: {},
//                     status: 'error'
//                 });
//             }
//             res.status(200).send({
//                 message: "Record saved successfully",
//                 status: 'status',
//                 data: data
//             })
//         })
//         .catch(err => {
//             let errorObject = error.getErrorMessage(err)
//             res.status(errorObject.code).send({ message: errorObject.message, data: {} })
//         })
// }



exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
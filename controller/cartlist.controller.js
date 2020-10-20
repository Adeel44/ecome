const CartList = require('../model/cartlist');
const error = require('../constant/error')
const Product = require('../model/product');
const User = require('../model/user');
const user = require('../model/user');


module.exports.create = (req, res) => {

    Product.findById(req.body.productId) // 5 min
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
       }

       User.findById(req.body.userId)
    .then(user =>{
        if(!user){
            return res.status(404).json({
                message: "User not found"
              });
        }
    })

      const cartlist = new CartList({
       // _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        price: req.body.price,
        quantity: req.body.quantity,
        calculation: req.body.calculation,
        user:req.body.userId
      });
      return cartlist.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "CartList ",
        CartList: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          price: result.price,
          user: result.user,
        }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

    
}

// module.exports.create = (req, res) => {

//     const cartlist = new CartList({

//         price: req.body.price,
//         quantity: req.body.quantity,
//         calculation: req.body.calculation,
//         productId:req.body.productId
                  
//         })
    
//         cartlist.save()
//         .then(data => {
//             if (!data || data == null) {
//                 return res.status(200).send({
//                     message: "Records Not Saved",
//                     data: {},
//                     status: 'error'
//                 });
//             }
//             res.status(200).send({
//                 message: "Cart saved successfully",
//                 status: 'status',
//                 data: data
//             })
//         })
//         .catch(err => {
//             let errorObject = error.getErrorMessage(err)
//             res.status(errorObject.code).send({ message: errorObject.message, data: {} })
//         })
// }

module.exports.list = (req, res) => {

    CartList.find()
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Records Not Found",
                    data: [],
                    status: 'error'
                });
            }
            res.status(200).send({
                message: 'successfully fetched!',
                data: data,
                status: "success"
            })
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        })

    
}

module.exports.findById = (req, res) => {

    CartList.findById(req.params.id)
    .populate('user')

    .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.send({ data, message: 'successfully !', status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, data: {}, status: 'error' })
        })
}

module.exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Record Must Not be Empty",
            status: 'error'
        });
    }

    let new_data = req.body;

    CartList.findByIdAndUpdate(req.params.id, { $set: new_data }, { new: true , useFindAndModify: false})
        .then(data => {
            if (!data || data == null) {
                console.log(data)
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({
                message: "Cart Updated Successfully",
                data: data,
                status: 'success'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });
}

module.exports.delete = (req, res) => {

    CartList.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({ message: "Record deleted successfully!", data, status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });
}
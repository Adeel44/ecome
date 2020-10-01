const { Order, CartItem } = require('../model/order');

const Product = require('../model/product');

const error = require('../constant/error')

const User = require('../model/user')



exports.orderById = (req, res) => {
    Order.findById(req.params.id)
      //  .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: "error"
                });
            }
            res.send(order)
           
        });
};


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


exports.list= (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "error"
                });
            }
            res.json(orders);
        });
};

module.exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Record Must Not be Empty",
            status: 'error'
        });
    }

    let new_data = req.body;

    Order.findByIdAndUpdate(req.params.id, { $set: new_data }, { new: true , useFindAndModify: false})
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
                message: "Record Updated Successfully",
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

    Order.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({ message: "Order deleted successfully!", data, status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });
}

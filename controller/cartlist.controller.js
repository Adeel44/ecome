const CartList = require('../model/cartlist');
const error = require('../constant/error')

module.exports.create = (req, res) => {

    const cartlist = new CartList({

        price: req.body.price,
        quantity: req.body.quantity,
        calculation: req.body.calculation
                  
        })
    
        cartlist.save()
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Records Not Saved",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({
                message: "Cart saved successfully",
                status: 'status',
                data: data
            })
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, data: {} })
        })
}

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
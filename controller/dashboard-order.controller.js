const Order = require('../model/order');

module.exports.getList = (req, res) => {

    Order.find()
        .then(order =>
            res.render("orders", {
                order: order,
                path: "/orders",
            })
        )
        .catch(err=>console.log(err))
    
}

module.exports.create = async (req, res) => {

    const order = new Order(req.body);
    await order.save();
    res.redirect('/orders');   
}    

module.exports.delete = (req, res) => {

    let id = req.params.id;

    Order.findByIdAndDelete({_id: id})
    .then(() => res.redirect("/orders"))
    .catch(err=>console.log(err))
}

module.exports.edit = async (req, res) => {

    const { id } = req.params;
    await Order.findOneAndUpdate({_id:id} , req.body);
    
    res.redirect('/orders');

}
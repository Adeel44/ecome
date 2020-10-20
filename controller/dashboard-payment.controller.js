const Payment = require('../model/payment')

module.exports.getList = (req, res) => {
    Payment.find()
        .then(payment =>
            res.render("payments", {
                payment: payment,
                path: "/payments",
            })
        )
        .catch(err=>console.log(err))
    
}

module.exports.create = async (req, res) => {

    const payment = new Payment(req.body);
    await payment.save();
    res.redirect('/payments')
    
}    

module.exports.delete = (req, res) => {

    let id = req.params.id;

    Payment.findByIdAndDelete({_id: id})
    .then(() => res.redirect("/payments"))
    .catch(err=>console.log(err))  
}

module.exports.edit = async (req, res) => {

    const { id } = req.params;
    await Payment.findByIdAndUpdate({_id:id} , req.body);
    
    res.redirect('/payments');

}


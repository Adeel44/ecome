const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const checkoutdetailSchema = new mongoose.Schema(
    {
        // CartItem: {
        //     type: ObjectId,
        //     ref: "CartItem",
        //     required: true
        // },
        
        shippingaddress: {
            type: String
        },
       
        paymentMethod: {
            type: String
        },
        
    }
);

module.exports = mongoose.model("CheckoutDetail", checkoutdetailSchema);
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
    { 
        
        paymentStatus: {
            type: String
        },
        user: { type: ObjectId, ref: "User" }
        
    }
);

module.exports = mongoose.model("Payment", paymentSchema);
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const cartlistSchema = new mongoose.Schema({
    
    price: Number,
    quantity: Number,
    calculation: Number,
    user: { type: ObjectId, ref: "User" },
    product: { type: ObjectId, ref: "Product" },
   

})

module.exports = mongoose.model("CartList", cartlistSchema);
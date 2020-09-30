const mongoose = require("mongoose");

const cartlistSchema = new mongoose.Schema({
    
    price: Number,
    quantity: Number,
    calculation: Number

})

module.exports = mongoose.model("CartList", cartlistSchema);
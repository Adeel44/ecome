const Product = require('../model/product')
const Category = require('../model/category');


module.exports.getList = (req, res) => {
    Product.find({}, (err, product)=>{
        if(err){console.log(err);}

        res.render('products', {
            product:product,
        
        });

    });

    // Product.find().populate('category').exec(function(err, product) {
    //     if (err) { return console.log(err); }
    //         res.render('products', {
    //         product:product,
        
    //     });
    
        
    // });
}



module.exports.create = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products')
}    

module.exports.delete = (req, res) => {

    let id = req.params.id;

    Product.findByIdAndDelete({_id: id})
    .then(() => res.redirect("/products"))
    .catch(err=>console.log(err)) 
}

module.exports.edit = async (req, res) => {

    let id = req.params.id;
    await Product.findOneAndUpdate({_id: id}, req.body);
    
    res.redirect('/products');
    
}


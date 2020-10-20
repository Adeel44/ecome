const Category = require('../model/category');

module.exports.getList = (req, res) => {

    Category.find()
        .then(data =>
            res.render("categories", 
            
            {
                category: data,
                path: "/categories",
            }
            
            )

        )
        .catch(err=>console.log(err))
    
}

module.exports.create = (req, res) => {
    const name = req.body.name;
    
    const category = new Category({
        name,
    });

    category
        .save()
        .then(() => res.redirect("/categories"))
        .catch(err=>console.log(err))
  
}    

module.exports.delete = (req, res) => {

    let id = req.params.id;

    Category.findByIdAndDelete({_id: id})
    .then(() => res.redirect("/categories"))
    .catch(err=>console.log(err))
}

module.exports.edit = async (req, res) => {

    const { id } = req.params;
     await Category.findByIdAndUpdate({_id:id} , req.body);
            
     res.redirect('/categories');

   
}



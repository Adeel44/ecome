const express = require('express');
const router = express.Router();
const Category = require('../model/category');

const dcategoryController = require('../controller/dashboard-category.controller');



router.get('/categories',   dcategoryController.getList);
router.post('/add-category',  dcategoryController.create);
router.get('/category/:id', dcategoryController.delete );
router.post('/category/:id', dcategoryController.edit );



// router.post('/add-category', (req, res)=>{

//     const name = req.body.name;
    
//     const category = new Category({
//         name,
//     });

//     category
//         .save()
//         .then(() => res.redirect("/categories"))
//         .catch(err=>console.log(err))

    
// })

// router.get('/categories', (req, res)=>{ 

//     Category.find()
//         .then(data =>
//             res.render("categories", 
            
//             {
//                 category: data,
//                 path: "/categories",
//             }
            
//             )

//         )
//         .catch(err=>console.log(err))
    
// })

// router.get('/delete/:id', (req, res)=>{ 

//     let id = req.params.id;

//     Category.findByIdAndDelete({_id: id})
//     .then(() => res.redirect("/categories"))
//     .catch(err=>console.log(err))

// })




// router.post('/category/edit/:id', async (req, res) => {
//             const { id } = req.params;
//             await Category.findByIdAndUpdate({_id:id} , req.body);
            
//             res.redirect('/categories');
// })



module.exports = router;
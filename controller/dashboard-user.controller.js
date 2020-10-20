const User = require('../model/user');

module.exports.getList = (req, res)=>{ 

    User.find()
        .then(user =>
            res.render("users", {
                user: user,
                path: "/users",
            })
        )
        .catch(err=>console.log(err))
} 

module.exports.edit = async (req, res) => {

    const { id } = req.params;
    await User.findByIdAndUpdate( {_id:id} , req.body);
    
    res.redirect('/users')    
    
}
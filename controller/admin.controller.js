var jwt = require('jsonwebtoken');

const User = require('../model/user')
const bcrypt = require('bcryptjs');

const{registerValidation , loginValidation} = require('../config/validation')

module.exports.register= async (req, res) => {
    console.log('req.body',req.body)
    const {error}= registerValidation(req.body)
   if(error) return res.send(error.details[0].message);
   // checking if email already exist
   const emailExist = await User.findOne({email:req.body.email})
   if(emailExist) return res.status(400).send("Email already exist")

   

   // hash the password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash( req.body.password, salt);

      const user = new User({
          name:req.body.name,
          email:req.body.email,
          password:hashPassword
      })
      try{
          const savedUser = await user.save()
        //   res.send({user:user._id})
           res.redirect('/dashboard/login');

      }catch(err){
          res.status(400).send(err)
      }
}

module.exports.login = async (req, res) => {

    const {error}= loginValidation(req.body)
    if(error) return res.send(error.details[0].message);

      // checking if email already exist
   const user = await User.findOne({email:req.body.email})
   if(!user) return res.status(400).send("Email not found")

   // Checing password
   const validPass = await bcrypt.compare( req.body.password, user.password); //  true
   if(!validPass) return res.status(400).send("invalid password")

   // Create and assaign token
   const  token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
   res.redirect('/dashboard')
   console.log('auth-token' , token)
   console.log("log in")
   console.log({user:user._id})
   console.log({user:user.name})
   console.log({user:user.email})
    //redirect , data
}

module.exports.verify_posts =  (req, res) => {

    res.send(req.user)

}
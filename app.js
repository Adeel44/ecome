const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const checkoutRoutes = require('./routes/checkoutdetail');
const cartlistRoutes = require('./routes/cartlist');


dotenv.config()


mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error , clint)=>{
      if(error){
     return console.log("Unable  to conect to db")
      }
      console.log("conected to db")

})



app.use(express.json())


app.get('/' , (req , res)=>{
  res.json({success_note: "welcome to  application"})
})

//Route middlewae
 app.use('/api/user' , authRoute)

 app.use('/api/category' , categoryRoutes)

 app.use('/api/product' , productRoutes)

 app.use('/api/order' , orderRoutes)

 app.use('/api/checkout' , checkoutRoutes)
 app.use('/api/cartlist' , cartlistRoutes)
 



const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`App is runing at ${port}`)

})
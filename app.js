const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path') 
const bodyparser = require('body-parser') 
const paypalroute = require('./routes/index'); //Rutas
const bodyParser = require('body-parser');//Cargar lector de formularios





const authRoute = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const checkoutRoutes = require('./routes/checkoutdetail');
const cartlistRoutes = require('./routes/cartlist');

var Publishable_Key = 'pk_test_51HXLjtAlEb4m9EqalHK8yoDBxc9MHbCBwPg6un8p8PfDTUd0wxJxugHYH3Q8Hdm0wuBvp3zh28K41bSAENAWHXlV00COIYYGyM'
var Secret_Key = 'sk_test_51HXLjtAlEb4m9EqaM0zrI7lvYpGfWg3KjMfNb1Qk7r2hlGzjKtKaFoYpCJ2DgBUjp5nCZZb5MMO0mbOSUe8AcF8W002zAnnbkW'

const stripe = require('stripe')(Secret_Key)


// app.use(bodyparser.urlencoded({extended:false})) 
// app.use(bodyparser.json()) 



dotenv.config()


// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 



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


// app.get('/' , (req , res)=>{
//   res.json({success_note: "welcome to  application"})
// })


//Route middlewae
 app.use('/api/user' , authRoute)

 app.use('/api/category' , categoryRoutes)

 app.use('/api/product' , productRoutes)

 app.use('/api/order' , orderRoutes)

 app.use('/api/checkout' , checkoutRoutes)
 app.use('/api/cartlist' , cartlistRoutes)


 //Cargar rutas
app.use('/api/paypal', paypalroute);



//Habilitar body parser para leer datos de formularios esto es un midleware asi que debe ir antes de las rutas
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});





 
 



app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        // name: 'Hamid', 
        // address: { 
        //     line1: 'TC 9/4 Old MES colony', 
        //     postal_code: '110092', 
        //     city: 'New Delhi', 
        //     state: 'Delhi', 
        //     country: 'India', 
        // } 
       
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 
 



const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`App is runing at ${port}`)

})
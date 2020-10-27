const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path') 

 // require('./config/email');



const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


const isAuth = require("./middleware/is-auth");


var methodOverride = require('method-override')
// const model = require('./model/product')();


let ejs = require('ejs');


//const bodyparser = require('body-parser') 
const paypalroute = require('./routes/index'); //Rutas
const bodyParser = require('body-parser');//Cargar lector de formularios


// const adRoute = require('./routes/ad')

const authRoute = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const checkoutRoutes = require('./routes/checkoutdetail');
// const cartlistRoutes = require('./routes/cartlist');

const drequestRoute = require('./routes/dashboard-request')

const dproductRoute = require('./routes/dashboard-product')
const dorderRoute = require('./routes/dashboard-order')
const dpaymentRoute = require('./routes/dashboard-payment')
const dcategoryRoute = require('./routes/dashboard-category')
const duserRoute = require('./routes/dashboard-user')

const adminRoute = require('./routes/admin')






const cartItemRoutes = require('./routes/cartItems');
const Category = require('./model/category');

var Publishable_Key = process.env.PUBLISH_KEY
var Secret_Key = 'sk_test_51HXLjtAlEb4m9EqaM0zrI7lvYpGfWg3KjMfNb1Qk7r2hlGzjKtKaFoYpCJ2DgBUjp5nCZZb5MMO0mbOSUe8AcF8W002zAnnbkW'

const stripe = require('stripe')(Secret_Key)


// app.use(bodyparser.urlencoded({extended:false})) 
// app.use(bodyparser.json()) 


dotenv.config()


// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(express.static(__dirname + '/public'));
// Express body parser
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
    uri: process.env.DB_CONNECT,
    collection: "test1",
});

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


app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
);



app.use(express.json())

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
  }))


// const isAuth = (req, res, next) => {
//     if (req.session.isAuth) {
//       next();
//     } else {
//       req.session.error = "You have to Login first";
//       res.redirect("/login");
//     }
// };
    




// app.get('/' , (req , res)=>{
//   res.json({success_note: "welcome to  application"})
// })


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/api/paypal', paypalroute());


//Route middlewae

 app.use('/api/user' , authRoute)

 app.use('/api/category' , categoryRoutes)

 app.use('/api/product' , productRoutes)

 app.use('/api/order' , orderRoutes)

 app.use('/api/checkout' , checkoutRoutes)

 // app.use('/api/cartlist' , cartlistRoutes)

 app.use('/api/cart' , cartItemRoutes)



// app.use('/api/admin' , adRoute)

 app.use('/' , drequestRoute)

 app.use('/' , dproductRoute)
 app.use('/' , dorderRoute)
 app.use('/' , dpaymentRoute)
 app.use('/' , dcategoryRoute)
 app.use('/' , duserRoute)

 app.use('/' , adminRoute)


 


 
app.get('/', (req, res)=>{ 
    res.send({Note:'welcome to Ecom'}) 
}) 


// app.get('/dashboard', async (req, res)=>{ 
//     let order = await Order.find()
//     let product = await Product.find()
//     let category = await Category.find()
//     let user = await User.find()

// res.render('dashboard', {noOfOrder:order.length,
//     noOfProduct:product.length,
//     noOfCategory:category.length,
//     noOfUser:user.length })
   
// })


// app.get('/dashboard',async (req, res)=>{ 
//     let product = await Product.find()
    
//    if(product){

//        res.render('dashboard', {noOfOrder:product.length}) 
//    }
   
// })


// app.get('/dashboard',async (req, res)=>{ 
//     let product = await Product.find()
//    if(!product){

//        res.render('dashboard', {noOfProduct:product.length}) 
//    }

// }) 





// app.get('/data', (req, res)=>{ 
//     res.render('data') 
// }) 




///////////////////////////////////////////////////////////////////////////////////////////






// app.get('/products', (req, res)=>{ 

//     res.render('products') 
// })


// app.get('/orders', (req, res)=>{ 
//     res.render('orders') 
// })

// app.get('/products', (req, res)=>{ 
//     res.render('products')
// })

// app.get('/users', (req, res)=>{ 
//     res.render('users') 
// })



// app.get('/payments',  (req, res)=>{ 
//     res.render('payments') 
// })

// app.get('/categories',  (req, res)=>{ 
//     res.render('categories') 
// })



// app.post('/add', (req, res)=>{

    
// })




app.get('/dashboard/login', (req, res)=>{ 
    res.render('login')
}) 


app.get('/dashboard/register', (req, res)=>{ 
    res.render('register') 
}) 


app.get('/forgot-password', (req, res)=>{ 
    res.render('forgot-password') 
}) 




//Habilitar body parser para leer datos de formularios esto es un midleware asi que debe ir antes de las rutas

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 


app.get('/home', function(req, res){ 
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



const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Swagger
const setupSwagger = require('./swagger');

const conn = require('./dbconn');
const {notFound, ErrHandler} = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');





// Setup Swagger
setupSwagger(app);


require('dotenv').config();
conn();
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRouter');
const emailRouter = require('./routes/emailRouter');
const blogRouter = require('./routes/blogRouter');
const categoryRouter = require('./routes/categoryRouters');
const userRouter = require('./routes/userRouter');
const couponRouter = require('./routes/couponRouter');
const cartRouter = require('./routes/cartRouter');
const orderRoute = require('./routes/orderRoute');
const searchRouter = require('./routes/searchRouter');


app.get('/', function (req, res) {
    res.send('Hello World!')
  })
// Routes

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/auth', authRouter)
app.use('/api/emails', emailRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRoute)
app.use('/api/search', searchRouter)





app.use(ErrHandler);
app.use(notFound);
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({ error: err.message });
    } else {
        next();
    }
});


// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);


})
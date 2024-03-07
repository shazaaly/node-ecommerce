const express = require('express');
const conn = require('./dbconn');
const {notFound, ErrHandler} = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


const app = express();
require('dotenv').config();
conn();
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRouter');

const bodyParser = require('body-parser');



// Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/users', authRouter)
app.use('/api/product', productRouter)




app.use(ErrHandler);
app.use(notFound);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);


})
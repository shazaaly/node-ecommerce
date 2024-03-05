const mongoose = require('mongoose');
const conn = ()=>{
    mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err));  
    }

module.exports = conn;
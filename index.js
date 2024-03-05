const express = require('express');
const conn = require('./dbconn');

const app = express();
conn();


const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use((req, res, next)=>{
    console.log(Time = Date.now());
    next()
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);


})
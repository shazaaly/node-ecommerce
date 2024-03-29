const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    process.exit(0);
  })
  .catch(err => {
    console.error('Could not connect to MongoDB Atlas', err);
    process.exit(1);
  });
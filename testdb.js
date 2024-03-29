const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/test-db-connection', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    res.send('Connected to MongoDB successfully');
  } catch (err) {
    res.status(500).send('Failed to connect to MongoDB: ' + err.message);
  }
});

module.exports = router;
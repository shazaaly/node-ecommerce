const jwt = require('jsonwebtoken');

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '55m' });
}

module.exports = generateToken; // Export the routes as an object
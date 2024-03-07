const jwt = require('jsonwebtoken');

const refreshTokenGenerator = (id) => {
   return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });
}

module.exports = refreshTokenGenerator; // Export the routes as an object
// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

function setupSwagger(app) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = setupSwagger;

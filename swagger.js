// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JJG Tech - Challenge Idwall', // Título da sua API
      version: '1.0.0', // Versão da sua API
    },
  },
  apis: ['index.js'], // Arquivo principal do seu aplicativo Node.js
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

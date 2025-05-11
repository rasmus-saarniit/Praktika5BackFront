const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation for the backend.',
  },
  host: 'localhost:3000', // Update this if your app runs on a different host or port
  schemes: ['http'], // Use 'https' if your app uses HTTPS
};


const outputFile = './swagger-output.json'; // Output file for the generated documentation
const endpointsFiles = ['./routes/books.js', './routes/comments.js', './routes/users.js', './routes/categories.js', './routes/authors.js'];
swaggerAutogen(outputFile, endpointsFiles);

// Generate Swagger specification using swagger-jsdoc
const swaggerSpec = swaggerJsdoc({
  definition: doc,
  apis: ['./routes/*.js'], // Path to your route files
});

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
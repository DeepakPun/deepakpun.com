import swaggerAutogen from 'swagger-autogen'
// const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Deepak Pun | MERN Stack API',
    description: 'Professional API documentation for my MERN projects.',
  },
  host: 'localhost:3000', // Update this to your production domain later
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js', './routes/*.js']; // Path to your main app and route files

/* Generate documentation */
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✔ Swagger documentation generated successfully!');
});

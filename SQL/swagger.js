const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Pokémon",
      version: "1.0.0",
      description: "Microservicio de Pokémon con Express",
    },
    servers: [
      {
        url: "https://backendpokeapi-rtnn.onrender.com",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

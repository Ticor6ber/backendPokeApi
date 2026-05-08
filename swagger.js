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
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
const express = require("express");
const cors = require("cors");

require("./db");

const Pokemon = require("./models/Pokemon");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   SWAGGER CONFIG
========================= */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon MongoDB API",
      version: "1.0.0",
      description: "API de Pokémon usando MongoDB Atlas"
    },
    servers: [
      {
        url: "http://localhost:3001"
      }
    ]
  },
  apis: ["./index.js"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* =========================
   RUTA POKEMON
========================= */

/**
 * @swagger
 * /pokemon/{nombre}:
 *   get:
 *     summary: Obtener un Pokémon por nombre
 *     description: Busca un Pokémon en MongoDB Atlas
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del Pokémon
 *     responses:
 *       200:
 *         description: Pokémon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 altura:
 *                   type: number
 *                 peso:
 *                   type: number
 *                 habilidades:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Pokémon no encontrado
 *       500:
 *         description: Error del servidor
 */

app.get("/pokemon/:nombre", async (req, res) => {

  try {

    const pokemon = await Pokemon.findOne({
      nombre: req.params.nombre.toLowerCase()
    });

    if (!pokemon) {

      return res.status(404).json({
        error: "Pokémon no encontrado"
      });
    }

    res.json(pokemon);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error del servidor"
    });
  }
});

/* =========================
   SERVIDOR
========================= */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(`Servidor corriendo en puerto ${PORT}`);

  console.log(
    `Swagger disponible en:
    http://localhost:${PORT}/api-docs`
  );
});

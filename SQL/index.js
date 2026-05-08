const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /pokemon/{nombre}:
 *   get:
 *     summary: Obtener información de un Pokémon desde PostgreSQL
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del Pokémon
 */
app.get("/pokemon/:nombre", async (req, res) => {
  const { nombre } = req.params;

  const query = `
    SELECT p.*, h.nombre AS habilidad
    FROM pokemon p
    LEFT JOIN pokemon_habilidades ph ON p.id = ph.pokemon_id
    LEFT JOIN habilidades h ON ph.habilidad_id = h.id
    WHERE LOWER(p.nombre) = LOWER($1)
  `;

  try {
    const result = await db.query(query, [nombre]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }

    const pokemon = {
      nombre: result.rows[0].nombre,
      altura: result.rows[0].altura,
      peso: result.rows[0].peso,
      habilidades: result.rows.map((r) => r.habilidad).filter(Boolean),
      imagenes: {
        frontal: result.rows[0].imagen_frontal,
        trasera: result.rows[0].imagen_trasera,
      },
    };

    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");

require("./db");

const Pokemon = require("./models/Pokemon");

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor Mongo corriendo en puerto ${PORT}`);
});

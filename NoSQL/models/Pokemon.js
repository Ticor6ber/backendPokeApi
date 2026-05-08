const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },

  altura: Number,

  peso: Number,

  habilidades: [String],

  imagenes: {
    frontal: String,
    trasera: String
  }

}, {
  collection: "pokemon"
});

module.exports = mongoose.model("Pokemon", pokemonSchema);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://angelxavier874_db_user:Ryly7XAF2UqpubJy@pokedb.o3ddyje.mongodb.net/?appName=PokeDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB conectado ✅"))
.catch(err => console.log(err));

module.exports = mongoose;

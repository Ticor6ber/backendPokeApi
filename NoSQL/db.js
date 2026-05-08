require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB conectado ✅");
})
.catch((err) => {
  console.log("Error MongoDB:");
  console.log(err);
});

module.exports = mongoose;

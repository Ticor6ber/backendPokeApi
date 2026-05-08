require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log("MongoDB conectado ✅");
})
.catch((err) => {
  console.log("Error conectando MongoDB ❌");
  console.log(err);
});

module.exports = mongoose;

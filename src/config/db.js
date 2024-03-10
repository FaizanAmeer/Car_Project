const mongoose = require("mongoose");
let isAlreadyConnecte = false;
const connectDB = async () => {
  if (isAlreadyConnecte) return;
  try {
    const conn = await mongoose.connect(process.env.URI);
    console.log(`Mongo DB Conneted: ${conn.connection.host}`);
    isAlreadyConnecte = true;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

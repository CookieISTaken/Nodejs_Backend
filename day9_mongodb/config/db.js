const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("--------Database connected-------");
  })
  .catch((err) => {
    console.log("--------Database connection error-------");
    console.log(err.message);
  });

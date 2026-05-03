require("dotenv").config();
require("./config/db"); // whenever you require it runs the file
const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
// so we can read the body
app.use(express.json());
app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});

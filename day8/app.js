const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    isSuccess: true,
    message: "Welcome to my app",
  });
});

// router at /api/v1
app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("App is running at port 3000");
});

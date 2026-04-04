const express = require("express");

const app = express();
try {
  app.get("/", (req, res) => {
    console.log("req recieved on {GET} " / " ");
    res.json({
      isSuccess: true,
      message: "Server is running fine... got a GET req",
      data: {},
    });
  });
} catch (err) {
  console.log(err);
}

app.post("/", (req, res) => {
  console.log("req recieved on " / " ");
  res.json({
    isSuccess: true,
    message: "Server is running fine... got a POST req",
    data: {},
  });
});

app.listen(3000, () => {
  console.log("App is listning at port 3000");
});

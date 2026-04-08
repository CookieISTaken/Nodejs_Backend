const express = require("express");
const { myReadFile, mySaveFile } = require("./utils/file_helpers");
const { v4: uuidv4 } = require("uuid");
const app = express();

// to read body
app.use(express.json());

// middleware by default express gives one but if we want to create our own
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.method);
  next();
});

app.get("/api/v1/products", async (req, res) => {
  const data = await myReadFile("./data.json");
  res.json({
    isSuccess: "YES",
    message: "Working {GET}",
    data: { Products: data },
  });
});

app.post("/api/v1/products", async (req, res) => {
  const data = req.body;
  console.log(data);
  data.id = uuidv4();
  const oldArr = await myReadFile("./data.json");
  console.log(oldArr);
  console.log("data type : ", typeof oldArr);
  // MANUAL Logic for new id
  //   let newdata;
  //   if (oldArr.length == 0) {
  //     newdata = {
  //       id: 1,
  //       ...data,
  //     };
  //   } else {
  //     newdata = {
  //       id: oldArr[oldArr.length - 1].id + 1,
  //       ...data,
  //     };
  // }
  oldArr.push(data);
  console.log(oldArr);
  await mySaveFile("./data.json", oldArr);
  res.status(201);
  res.json({
    message: "Product added to DB!",
  });
});

app.listen(3000, () => {
  console.log("App is listning at port 3000");
});

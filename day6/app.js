const express = require("express");
const { myReadFile, mySaveFile } = require("./utils/file_helpers");
const { v4: uuidv4 } = require("uuid");
const app = express();
const FILE_PATH = "./products.json";
const ORDERS_FILE_PATH = "./orders.json";

// to read body
app.use(express.json());

// middleware by default express gives one but if we want to create our own
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.method);
  next();
});

app.get("/api/v1/products", async (req, res) => {
  const data = await myReadFile(FILE_PATH);
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
  const oldArr = await myReadFile(FILE_PATH);
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
  await mySaveFile(FILE_PATH, oldArr);
  res.status(201);
  res.json({
    message: "Product added to DB!",
  });
});

app.patch("/api/v1/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const data = req.body;

  const products = await myReadFile(FILE_PATH);
  const idx = products.findIndex((elem) => {
    return elem.id === productId;
  });

  if (idx === -1) {
    res.status(400);
    res.json({
      isSuccess: false,
      message: "Invalid Product id",
    });
    return;
  }
  const odlObj = products[idx];
  // basically whatever is new in data will be replaced
  // in the oldObj
  products[idx] = { ...odlObj, ...data };
  await mySaveFile(FILE_PATH, products);
  res.status(204);
  res.json({
    isSuccess: true,
    message: "Product is added to db",
    data: {
      product: products[idx],
    },
  });
});
//
app.delete("/api/v1/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const products = await myReadFile(FILE_PATH);
  // const newproducts = [];
  // products.forEach((element) => {
  //   if (element.id != productId) newproducts.push(element);
  // });
  // await mySaveFile(FILE_PATH, newproducts);
  // res.status(200);
  // res.json({
  //   isSuccess: true,
  //   message: "Product deleted",
  //   data: {
  //     products: {
  //       newproducts,
  //     },
  //   },
  // });
  // better approach
  const idx = products.findIndex((element) => {
    return element.id === productId;
  });
  if (idx === -1) {
    res.status(400);
    res.json({
      isSuccess: false,
      message: "Invalid Product id",
    });
    return;
  }
  products.splice(idx, 1);
  await mySaveFile(FILE_PATH, products);
  res.status(200);
  res.json({
    isSuccess: true,
    message: "Product deleted",
    data: {
      products: {
        products,
      },
    },
  });
});

// buy items
app.post("/api/v1/orders", async (req, res) => {
  const data = req.body;
  const { productId } = data;
  const products = await myReadFile(FILE_PATH);

  const idx = products.findIndex((element) => {
    return element.id === productId;
  });

  if (idx === -1) {
    res.status(400);
    res.json({
      isSuccess: false,
      message: "Invalid Product id",
    });
    return;
  }
  let productquantity = products[idx].quantity;
  if (productquantity <= 0) {
    res.status(500);
    res.json({
      isSuccess: false,
      message: "Product out of stock!",
    });
    return;
  }
  products[idx] = { ...products[idx], quantity: productquantity - 1 };
  await mySaveFile(FILE_PATH, products);

  const orders = await myReadFile(ORDERS_FILE_PATH);
  orders.push({
    id: uuidv4(),
    productId: productId,
  });
  await mySaveFile(ORDERS_FILE_PATH, orders);

  res.status(201);
  res.json({
    isSuccess: true,
    message: "Order created!",
  });
});
app.listen(3000, () => {
  console.log("App is listning at port 3000");
});

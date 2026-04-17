const validateProductForCreation = async (req, res, next) => {
  try {
    const data = req.body;
    const { name, price, quantity } = data;

    if (!name || name.length < 5) {
      res.status(400).json({
        isSuccess: false,
        message: "Title too short",
      });
      return;
    }
    if (!price || price <= 0) {
      res.status(400).json({
        isSuccess: false,
        message: "Price not valid!",
      });
      return;
    }
    if (!quantity || quantity <= 0) {
      res.status(400).json({
        isSuccess: false,
        message: "Quantity not valid!",
      });
      return;
    }
    req.body = { name: name.trim(), price, quantity };
    next();
  } catch (err) {
    console.log("-----Error in validateProductForCreation", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal server error!",
    });
  }
};

module.exports = { validateProductForCreation };

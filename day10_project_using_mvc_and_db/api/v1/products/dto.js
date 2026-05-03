const createProductValidator = (req, res, next) => {
  try {
    const { title, price, quantity, description } = req.body;
    if (quantity && quantity < 0) {
      res.status(400).json({
        isSuccess: false,
        message: "Quantity Should be > 0",
        data: {},
      });
      return;
    }
    if (!price || price < 0) {
      res.status(400).json({
        isSuccess: false,
        message: "Price Should be > 0",
        data: {},
      });
      return;
    }
    if (description && description.length <= 5) {
      res.status(400).json({
        isSuccess: false,
        message: "Description too short",
        data: {},
      });
      return;
    }

    if (!title || title.length < 2) {
      res.status(400).json({
        isSuccess: false,
        message: "Title length should be greater than 2",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    console.log(
      "-----------------Error in createProductValidator -----------------",
      err.message,
    );
    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = { createProductValidator };

const { divison, power } = require("./math_helper");

const calculatebmi = (obj) => {
  const { height, weight } = obj;
  const heightsquare = power(height, 2);
  const bmi = divison(weight, heightsquare);

  setTimeout(() => {
    console.log(bmi);
  }, 2000);
};

module.exports = calculatebmi;

const getProductsFromDB = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = response.json();
  return data;
};

const getProductCards = async () => {
  const { products } = await getProductsFromDB();
  let res = "";
  products.forEach((elem) => {
    const cardStr = `<div class = 'card'>
     <img src = "${elem.thumbnail}" width = '200'></img>
     <h4>${elem.title}</h4> 
     <h6>${elem.price}</h6>
    </div>`;
    res = res + "\n" + cardStr;
  });
  return res;
};

module.exports = { getProductCards };

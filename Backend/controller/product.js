const Product = require("../models/product");
const sellProduct = require("../models/sellProduct");

const addProduct = async (req, res) => {
  try {
    const {
      categoryName,
      prodName,
      prodId,
      qnty,
      weight,
      price,
      buyDate
    } = await req.body;
    const prodObj = {
      categoryName,
      prodName,
      prodId,
      qnty,
      weight,
      price,
      buyDate,
      user: req.user
    };
    const allProd = await Product.find({});
    const prodTosave = await new Product(prodObj);
    const newProd = await prodTosave.save();
    return res.json(newProd);
  } catch (error) {
    return res.json(error);
  }
};
const sell_Product = async (req, res) => {
  try {
    const { categoryName, prodName, prodId, sellQnty, price } = await req.body;
    const prod = await Product.findOne({ prodId });
    if (prod) {
      if (prod.qnty < 1) {
        await prod.remove();
        return res.json({ msg: "Enough product is not in store" });
      }
      if (sellQnty > prod.qnty) {
        return res.json({ msg: "Enough product is not in store" });
      } else {
        const sellProd = await new sellProduct({
          categoryName,
          prodName,
          prodId,
          sellQnty,
          totalPrice: sellQnty * prod.price
        });
        prod.qnty = prod.qnty - sellQnty;
        await prod.save();
        const soldProd = await sellProd.save();
        return res.json(soldProd);
      }
    } else {
      return res.json({ msg: "Enough product is not in store" });
    }
  } catch (error) {
    res.json(error);
  }
};
const getAllProd = async (req, res) => {
  try {
    const allProd = await Product.find({});
    res.json(allProd);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { addProduct, sell_Product, getAllProd };

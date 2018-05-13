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
    const prodTosave = await new Product(prodObj);
    await prodTosave.save();
    const allProd = await Product.find({});
    return res.json(allProd);
  } catch (error) {
    return res.json(error);
  }
};
const sell_Product = async (req, res) => {
  try {
    const { categoryName, prodName, prodId, sellQnty, price } = await req.body;
    const prod = await Product.findOne({ prodId });
    if (prod) {
      if (prod.qnty === 0) {
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
        const allProd = await Product.find({});
        for (let i = 0; i < allProd.length; i++) {
          console.log(allProd[i].qnty === 0)
          if (allProd[i].qnty === 0) {
            await allProd[i].remove()
          }
        }
        return res.json({ soldProd, allProd });
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
    for (let i = 0; i < allProd.length; i++) {
      if (allProd[i].qnty === 0) {
        await allProd[i].remove();
      }
    }
    return res.json(allProd);
  } catch (error) {
    res.json(error);
  }
};

const soldProduct = async (req, res) => {
  try {
    const allProd = await sellProduct.find({});
    return res.json(allProd);
  } catch (error) {
    res.json(error);
  }
};
module.exports = { addProduct, sell_Product, getAllProd, soldProduct };

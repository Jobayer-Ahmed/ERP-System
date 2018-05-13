const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellProduct = new Schema({
  categoryName: {
    type: String,
    required: "Please provide product category",
    lowercase: true
  },
  prodName: {
    type: String,
    required: "Please provide product name."
  },
  prodId: {
    type: String,
    required: "Please provide product id."
  },
  sellDate: {
    type: Date,
    default: Date.now
  },
  sellQnty: {
    type: Number
  },
  totalPrice: {
    type: Number
  }
});
module.exports = mongoose.model("sellProduct", sellProduct);

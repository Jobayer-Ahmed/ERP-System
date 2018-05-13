const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  categoryName: {
    type: String,
    required: "Please provide product category",
    lowercase: true
  },
  prodName: {
    type: String,
    required: "Please provide product name.",
  },
  prodId: {
    type: String,
    required: "Please provide product id."
  },
  qnty: {
    type: Number,
    required: "Please provide product quantity."
  },
  weight: {
    type: Number
  },
  price: {
    type: Number,
    required: "Please provide product price."
  },
  buyDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Product", Product);

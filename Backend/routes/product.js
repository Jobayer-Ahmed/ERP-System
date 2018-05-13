const router = require("express").Router();
const authController = require("../controller/auth");
const prodController = require("../controller/product");

router.get("/all-product", authController.isLoggedIn, prodController.getAllProd);
router.post("/add-product", authController.isLoggedIn , prodController.addProduct);
router.post("/sell-product", authController.isLoggedIn , prodController.sell_Product);

module.exports = router;

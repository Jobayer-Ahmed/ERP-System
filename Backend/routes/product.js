const router = require("express").Router();
const authController = require("../controller/auth");
const prodController = require("../controller/product");

router.get("/all-product", prodController.getAllProd);
router.post("/add-product", prodController.addProduct);
router.post("/sell-product", prodController.sell_Product);
router.get("/all-sold-product", prodController.soldProduct);

module.exports = router;

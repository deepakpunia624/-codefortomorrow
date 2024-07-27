const express = require("express");
const category = require("../controller/category");
const { userAuthentication } = require("../middleware/auth");

const router = express.Router();

router.post("/create", userAuthentication, category.createCategory);
router.get("/getAll", userAuthentication, category.getAllCategories);
router.put("/update/:id", userAuthentication, category.categoryUpdate);
router.delete("/delete/:id", userAuthentication, category.categoryDelete);

module.exports = router;

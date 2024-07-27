const express = require("express");
const service = require("../controller/services");
const { userAuthentication } = require("../middleware/auth");

const router = express.Router();

router.post("/create/:id", userAuthentication, service.createService);
router.get(
  "/:id/category",
  userAuthentication,
  service.getAllServicesByCategoryId
);
router.delete(
  "/category/:categoryId/:id",
  userAuthentication,
  service.removeServiceFromCategory
);

module.exports = router;

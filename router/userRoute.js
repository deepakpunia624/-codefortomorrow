const express = require("express");
const user = require("../controller/users");

const router = express.Router();

router.post("/create", user.userCreate);

router.post("/login", user.userLogin);

module.exports = router;

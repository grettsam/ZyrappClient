const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("productos/productos");
});

router.get("/addProductos", (req, res) => {
  res.render("productos/addProductos");
});

module.exports = router;

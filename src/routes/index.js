const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

router.get("/", isLoginIn, async (req, res) => {
  const monto = await pool.query(
    "SELECT SUM(ventas.monto) AS monto FROM ventas WHERE clients_id = ?",
    [req.user.clients_id]
  );
  montoFinal = monto[0].monto;
  res.render("home", { montoFinal });
});

module.exports = router;

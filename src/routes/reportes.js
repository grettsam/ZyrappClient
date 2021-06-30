const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

router.get("/", isLoginIn, async (req, res) => {
  const montoCantidad = await pool.query(
    "SELECT SUM(ventas.monto) AS monto, SUM(ventas.cantidad) AS cantidad FROM ventas WHERE clients_id = ?",
    [req.user.clients_id]
  );
  monto = montoCantidad[0].monto;
  cantidad = montoCantidad[0].cantidad;
  res.render("reportes/reportes", { monto, cantidad });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

router.get("/", isLoginIn, async (req, res) => {
  const monto = await pool.query(
    "SELECT SUM(ventas.monto) AS monto FROM ventas WHERE clients_id = ?",
    [req.user.clients_id]
  );
  const masVendidos = await pool.query(
    "SELECT productos.*, ventas.total AS cantidadVentas FROM productos LEFT JOIN (SELECT productos_id,  SUM(cantidad) AS total FROM ventas GROUP BY productos_id) AS ventas ON productos.producto_id = ventas.productos_id WHERE productos.clients_id=?  GROUP BY productos.producto_id ORDER BY ventas.total DESC LIMIT 10",
    [req.user.clients_id]
  );
  const menosVendidos = await pool.query(
    "SELECT productos.*, ventas.total AS cantidadVentas FROM productos LEFT JOIN (SELECT productos_id,  SUM(cantidad) AS total FROM ventas GROUP BY productos_id) AS ventas ON productos.producto_id = ventas.productos_id WHERE productos.clients_id=?  GROUP BY productos.producto_id ORDER BY ventas.total ASC LIMIT 10",
    [req.user.clients_id]
  );

  montoFinal = monto[0].monto;
  console.log(masVendidos);
  res.render("home", { montoFinal ,masVendidos, menosVendidos});
});

module.exports = router;

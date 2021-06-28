const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

router.get("/", isLoginIn, async (req, res) => {
  const cliente = await pool.query(
    "SELECT * FROM clients WHERE clients_id = ?",
    [req.user.clients_id]
  );
  const ejemplo = await pool.query(
    "SELECT JSON_EXTRACT(totalVentasSemanal, '$.acerca.genero') AS Genero FROM clients WHERE clients_id = ?",
    [req.user.clients_id]
  );
console.log(ejemplo);
  res.render("home", { cliente, ejemplo });
});

module.exports = router;

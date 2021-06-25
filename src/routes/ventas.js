const express = require("express");
const pool = require("../database");
const router = express.Router();

router.get("/", async (req, res) => {
  // const ventas = await pool.query("SELECT * FORM ventas WHERE clients_id = ?",[id]);
  const ventas = await pool.query("SELECT * FROM ventas");
  res.render("ventas/ventas", { ventas });
});

/******************Estado de leido*********************/
router.get("/visto/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set visto = false WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoVisto/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set visto = true WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Estado de enviado*********************/

router.get("/enviado/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set enviado = false WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoEnviado/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set enviado = true WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Estado de terminado*********************/

router.get("/terminado/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set completado = false WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoTerminado/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set completado = true WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Eliminar*********************/
router.get("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM ventas WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/mensajes/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    "Ventada de mensajes enviados a los clientes para hablar con el usuario " +
      [id]
  );
});

module.exports = router;

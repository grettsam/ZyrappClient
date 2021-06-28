const express = require("express");
const pool = require("../database");
const router = express.Router();
const { isLoginIn } = require("../lib/auth");


router.get("/", isLoginIn, async (req, res) => {
  // const ventas = await pool.query("SELECT * FORM ventas WHERE clients_id = ?",[id]);
  const ventas = await pool.query("SELECT * FROM ventas");
  res.render("ventas/ventas", { ventas });
});

/******************Estado de leido*********************/
router.get("/visto/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set visto = false WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoVisto/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set visto = true WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Estado de enviado*********************/

router.get("/enviado/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set enviado = false WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoEnviado/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set enviado = true WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Estado de terminado*********************/

router.get("/terminado/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set completado = false WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/NoTerminado/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`UPDATE ventas set completado = true WHERE ventas_id= ?`, [
    id,
  ]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

/******************Eliminar*********************/
router.get("/eliminar/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM ventas WHERE ventas_id= ?`, [id]);
  req.flash("success", " El cliente no esta visible");
  res.redirect("/ventas");
});

router.get("/mensajes/:id", isLoginIn, async (req, res) => {
  const { id } = req.params;
  res.send(
    "Ventada de mensajes enviados a los clientes para hablar con el usuario " +
      [id]
  );
});

module.exports = router;

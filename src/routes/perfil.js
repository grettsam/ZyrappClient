const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const { isLoginIn } = require("../lib/auth");
const { v4: uuidv4 } = require('uuid');

var picPerfil = [];
var uuid = uuidv4();
// Configuracion de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/cliente"),
  filename: (req, file, cb) => {
    cb(
      null,
      uuid.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
    picPerfil.push(
      uuid.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
  },
});

// Multer (Subir imagenes)
router.use(
  multer({
    storage,
    dest: path.join(__dirname, "../public/upload/cliente"),
    limits: { fileSize: 2000000 }, //2MB

    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error en el tipo de archivo");
      }
    },
  }).fields([{ name: "pic_perfil" }])
);

router.get("/", isLoginIn, async (req, res) => {
  res.render("perfil/perfil");
});

router.post("/updatePerfil", async (req, res) => {
  const {
    email,
    banco,
    telefono,
    region,
    comuna,
    direccion,
    sitioWeb,
    facebook,
    instagram,
    twitter,
  } = req.body;
  const newClients = {
    email,
    banco,
    telefono,
    region,
    comuna,
    direccion,
    sitioWeb,
    facebook,
    instagram,
    twitter,
    pic_perfil: `http://localhost:4000/upload/cliente/${picPerfil[0]}`,
  };
  console.log(newClients);
  await pool.query(`UPDATE clients set ? WHERE clients_id = ?`, [
    newClients,
    req.user.clients_id,
  ]);

  console.log(req.user.clients_id);
  console.log(newClients);

  while (picPerfil.length > 0) {
    picPerfil.pop();
  }

  res.redirect("/");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const { isLoginIn } = require("../lib/auth");

var picPerfil = [];

// Configuracion de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/cliente"),
  filename: (req, file, cb) => {
    const { nombre } = req.body;
    cb(
      null,
      nombre.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
    picPerfil.push(
      nombre.replace(/\s+/g, "_") +
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
  }).fields([{ name: "pic1_producto" }, { name: "pic2_producto" }])
);

router.get("/", isLoginIn, (req, res) => {
  res.render("perfil/perfil");
});

module.exports = router;

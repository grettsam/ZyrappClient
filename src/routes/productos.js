const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const { isLoginIn } = require("../lib/auth");

var picProducto = [];

// Configuracion de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/productos"),
  filename: (req, file, cb) => {
    const { nombre } = req.body;
    cb(
      null,
      nombre.replace(/\s+/g, "_") +
        "--" +
        file.originalname.toLocaleLowerCase().replace(/\s+/g, "")
    );
    picProducto.push(
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
    dest: path.join(__dirname, "../public/upload/productos"),
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

router.get("/", async (req, res) => {
  const productos = await pool.query("SELECT * FROM productos");
  res.render("productos/productos", { productos });

});

//*******            CREATE            ******/
//Metodo async para enviar la query para agregar un nuevo producto.

router.get("/addProductos", (req, res) => {
  res.render("productos/addProductos");
});

router.post("/addProductos", async (req, res) => {
  const { nombre, categoria, stock, valor, descripcion } = req.body;
  const newProducto = {
    nombre,
    categoria,
    stock,
    valor,
    descripcion,
    pic1_producto: `http://localhost:4000/upload/productos/${picProducto[0]}`,
    pic2_producto: `http://localhost:4000/upload/productos/${picProducto[1]}`,
    // admin_id: req.user.admin_id,
  };
  await pool.query(`INSERT INTO productos set ?`, [newProducto]);
  // req.flash("success", "Guia creada");
  res.redirect("/productos");
  // res.send("Guardado y todo OK");
});

module.exports = router;

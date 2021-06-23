const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('reportes/reportes')
  });


module.exports = router;
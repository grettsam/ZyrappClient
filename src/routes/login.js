const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoginIn, isNotLoginIn } = require("../lib/auth");

/*********** Login ************/
router.get("/login", isNotLoginIn, async (req, res) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local.loginClients", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", isLoginIn, (req, res) => {
    req.logOut();
    res.redirect("/");
  });


module.exports = router;

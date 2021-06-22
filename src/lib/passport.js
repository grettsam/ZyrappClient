const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

/*********************Login**********************************/
passport.use(
    "local.loginClients",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const rows = await pool.query("SELECT * FROM clients WHERE username = ?", [
          username,
        ]);
        console.log(rows[0]);
        if (rows.length > 0) {
          const user = rows[0];
          const validPassword = await helpers.desencriptador(
            password,
            user.password
          );
          if (validPassword) {
            done(null, user, req.flash("success", "Bienvenido " + user.username));
          } else {
            done(null, false, req.flash("message", "Contraseña incorrecta"));
          }
        } else {
          done(null, false, req.flash("message", "Usuario no encontrado"));
        }
      }
    )
  );

  /*********************SingUp**********************************/
  /* Analizar si es que se tiene que usar el sing up ya que en si el cliente no tiene que crear una cuenta y solo tiene que registrar productos. */
passport.use(
    "local.signupClients",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { email } = req.body; 
        const newAdmin = {
          username,
          password,
          email,
        };
        newAdmin.password = await helpers.encriptador(password);
  
        const result = await pool.query("INSERT INTO admin SET ?", [newAdmin]);
        newAdmin.id = result.insertId;
        return done(null, newAdmin, req.flash("success", "Nuevo usuario creado"));
      }
    )
  );

 /********************* Serializar *****************************/
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
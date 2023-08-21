import { Router } from "express";
import UserModel from "../models/user.model.js";
import notifier from 'node-notifier';

import { isLoggedIn } from "./middlewares.routes.js"
import nodemon from "nodemon";

const router = Router();

function auth(req, res, next) {
  console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validación para el usuario administrador
  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    req.session.user = {
      email: username,
      admin: true
    };
    
    notifier.notify({
      title: 'Info',
      message: 'Autenticación del administrador.'
    });

  }

  const result = await UserModel.find({ email: username, password });

  console.log(result);
  if (result.length === 0) {  
    notifier.notify({
      title: 'Info',
      message: 'Error en la autenticación.'
    });
    
    return res.status(401).json({ respuesta: "Error de autenticación" });
  } else {
    req.session.user = {
      email: username,
      admin: false
    };
 
    res.status(200).json({ respuesta: "Autenticado exitosamente" });
  }
});


router.post("/signup", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  const result = await UserModel.create({//crea el usuario
    first_name,
    last_name,
    age,
    email,
    password,
  });

  if (result === null) {
    return res.status(401).json({
      respuesta: "error",
    });
  } else {
    req.session.user = email;
    req.session.admin = true;
    res.status(200).json({
      respuesta: "ok",
    });
  }
});

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {});
});


// router.get("/", isLoggedIn, (req, res) => {
//   res.render("profile", { user: req.session.user });
// });

// Ruta para cerrar sesión
// router.get("/logout", (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error("Error al cerrar sesión:", err);
//       return res.status(500).json({ respuesta: "Error en el servidor" });
//     }
//     else{
//       console.log("sesion cerrada");
//       res.redirect("/login"); 
//     }

//   });
// });

export default router;
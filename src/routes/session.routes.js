import { Router } from "express";
import UserModel from "../models/user.model.js";
import notifier from 'node-notifier';
//import { auth } from "./middlewares.routes.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await UserModel.findOne({ email: username, password }).lean();

  // Validación para el usuario administrador
  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session.user = {
      email: username,
      admin:true,
    };

    notifier.notify({
      title: 'Info',
      message: 'Autenticación del administrador.',
    });

  }

  if (!result) {
    notifier.notify({
      title: 'Info',
      message: 'Error en la autenticación.'
    });

    return res.status(401).json({ respuesta: "Error de autenticación" });
  }
  if (username !== 'adminCoder@coder.com' && password !== 'adminCod3r123'){ 
  req.session.user = {
    email: username,
    admin:false
  };
}
  res.status(200).json({ respuesta: "Autenticado exitosamente" });
});


export default router;

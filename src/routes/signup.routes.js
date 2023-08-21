import { Router } from "express";
import { redirectToProfileIfLoggedIn } from './middlewares.routes.js';

const router = Router();

router.get("", (req, res) => {
  res.render("signup", {
    title: "Crea tu cuenta",
  });
});

router.get("/", redirectToProfileIfLoggedIn, (req, res) => {
  res.render("signup");
});

export default router;
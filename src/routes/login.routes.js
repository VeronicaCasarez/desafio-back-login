import { Router } from "express";
import { redirectToProfileIfLoggedIn } from "./middlewares.routes.js";

const router = Router();

router.get("", (req, res) => {
  res.render("login", {
    title: "Inicia sesion",
  });
});

// router.get("/", redirectToProfileIfLoggedIn, (req, res) => {
//   res.render("login");
// });
export default router;
import { Router } from "express";
import { __dirname } from "../utils.js";


const router =Router()

router.get("/",  (req, res) => {
    res.render("private", {});
  });
export default router;

  
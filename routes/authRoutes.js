import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/", authController.renderWelcome);
router.get("/login", authController.renderLogin);
router.post("/login", authController.login);
router.get("/signup", authController.renderSignup);
router.post("/signup", authController.signup);

export default router;

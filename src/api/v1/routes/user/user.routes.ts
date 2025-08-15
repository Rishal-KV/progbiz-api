import express from "express";
import AuthController from "../../controllers/user/auth.user.controller";
import landingRouter from "./landing.user.routes";

const userRoutes: express.Router = express.Router();

// Auth routes

// // Protected routes
const authController = new AuthController();

userRoutes.post("/auth/login", authController.login.bind(authController));
userRoutes.post("/auth/register", authController.register.bind(authController));

userRoutes.use("/landing", landingRouter);

export default userRoutes;

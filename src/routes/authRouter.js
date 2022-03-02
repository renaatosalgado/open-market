import { Router } from "express";
import { signUp, login } from "../controllers/authControler.js";
import { validateSignUp } from "../middlewares/validateSignUpMiddleware.js";
import { validateLogin } from "../middlewares/validateLoginMiddleware.js";

const authRouter = Router();

authRouter.post("/signUp", validateSignUp, signUp);
authRouter.post("/login", validateLogin, login);

export default authRouter;

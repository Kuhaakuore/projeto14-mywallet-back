import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import { validateUserSchemas } from "../middlewares/validateUserSchemas.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/cadastro", validateUserSchemas(signUpSchema), signUp);
userRouter.post("/", validateUserSchemas(signInSchema), signIn);

export default userRouter;
import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(signUpSchema), signUp);
userRouter.post("/", validateSchema(signInSchema), signIn);

export default userRouter;
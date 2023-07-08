import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post('/cadastro', validateSchema(userSchema), signUp);

export default userRouter;
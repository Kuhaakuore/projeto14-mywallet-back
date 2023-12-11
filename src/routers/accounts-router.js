import { Router } from "express";
import { signIn, signUp } from "../controllers/accounts-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { signInSchema, signUpSchema } from "../schemas/accounts-schemas.js";

const accountRouter = Router();

accountRouter
    .post("/signup", validateBody(signUpSchema), signUp)
    .post("/", validateBody(signInSchema), signIn);

export { accountRouter };
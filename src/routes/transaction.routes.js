import { Router } from "express";
import { validateTransactionSchemas } from "../middlewares/validateTransactionSchemas.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";
import { createTransaction } from "../controllers/transaction.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const transactionRouter = Router();

transactionRouter.use(validateAuth);
transactionRouter.post("/nova-transacao/:tipo", validateTransactionSchemas(transactionSchema), createTransaction);

export default transactionRouter;
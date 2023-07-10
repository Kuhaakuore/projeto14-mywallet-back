import { Router } from "express";
import { validateTransactionSchemas } from "../middlewares/validateTransactionSchemas.js";
import { editTransactionSchema, transactionSchema } from "../schemas/transaction.schemas.js";
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "../controllers/transaction.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const transactionRouter = Router();

transactionRouter.use(validateAuth);
transactionRouter.post("/nova-transacao/:tipo", validateTransactionSchemas(transactionSchema), createTransaction);
transactionRouter.get("/home", getTransactions);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.put("/editar-registro/:tipo/:id", validateTransactionSchemas(editTransactionSchema), editTransaction);

export default transactionRouter;
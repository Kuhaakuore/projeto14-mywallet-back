import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware.js";
import { editTransactionSchema, transactionSchema } from "../schemas/transactions.schemas.js";
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "../controllers/transactions-controller.js";
import { validateAuth } from "../middlewares/authentication-middleware.js";

const transactionRouter = Router();

transactionRouter
    .use(validateAuth)
    .post("/new-entry/:type", validateBody(transactionSchema), createTransaction)
    .get("/home", getTransactions)
    .delete("/:id", deleteTransaction)
    .put("/edit-entry/:type/:id", validateBody(editTransactionSchema), editTransaction);

export { transactionRouter };
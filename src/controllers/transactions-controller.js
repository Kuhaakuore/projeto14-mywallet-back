import httpStatus from "http-status";
import { transactionService } from "../services/transaction-service.js";

export async function createTransaction(req, res) {
  const { session } = res.locals;
  const type = req.params.tipo;

  const trasactionData = { session, type, ...req.body };

  await transactionService.createTransaction(trasactionData);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getTransactions(req, res) {
  const { session } = res.locals;

  const accountTransactions = await transactionService.getTransactions(session);

  return res.status(httpStatus.OK).send(accountTransactions);
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;

  await transactionService.deleteTransaction(id);

  return res.sendStatus(httpStatus.ACCEPTED);
}

export async function editTransaction(req, res) {
  const { id } = req.params;
  const data = { id, ...req.body };

  await transactionService.editTransaction(data);

  return res.sendStatus(httpStatus.ACCEPTED);
}

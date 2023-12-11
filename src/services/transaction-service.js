import { transactionRepository } from "../repositories/transactions-repository.js";
import { accountRepository } from "../repositories/accounts-repository.js";
import { transactionNotFound } from "../errors/transaction-not-found.js";

export async function createTransaction(data) {
  await transactionRepository.createTransaction(data);
}

export async function getTransactions(session) {
  const transactions = await transactionRepository.getTransactions(session);
  const { userName } = await accountRepository.getAccount(session);
  return { userName, transactions };
}

export async function deleteTransaction(id) {
  const result = await transactionRepository.deleteTransaction(id);
  if (result.deletedCount === 0) throw transactionNotFound();
}

export async function editTransaction(data) {
  const result = await transactionRepository.editTransaction(data);
  if (result.modifiedCount === 0) throw transactionNotFound();
}

export const transactionService = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  editTransaction,
};

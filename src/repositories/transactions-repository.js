import { db } from "../config/database.js";
import { ObjectId } from "mongodb";

export async function createTransaction(transactionData) {
  const { session, type, value, description, date } = transactionData;
  const transaction = {
    accountId: session.accountId,
    type,
    value,
    description,
    date,
  };
  await db.collection("transactions").insertOne(transaction);
}

export async function getTransactions(session) {
  const transactions = await db
    .collection("transactions")
    .find({ accountId: session.accountId })
    .toArray();
  return transactions;
}

export async function deleteTransaction(id) {
  const result = await db
    .collection("transactions")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function editTransaction(data) {
  const { id, description, value } = data;
  const result = await db
    .collection("transactions")
    .updateOne({ _id: new ObjectId(id) }, { $set: { description, value } });
  return result;
}

export const transactionRepository = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  editTransaction,
};

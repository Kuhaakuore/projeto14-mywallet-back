import { db } from "../config/database.js";
import { ObjectId } from "mongodb";

async function signUp(data) {
  const { userName, email, password } = data;

  await db.collection("accounts").insertOne({
    userName,
    password,
    email,
  });
}

async function findAccount(email) {
  const account = await db.collection("accounts").findOne({ email });
  return account;
}

async function getAccount(session) {
  const account = await db
    .collection("accounts")
    .findOne({ _id: new ObjectId(session.accountId) });
  return account;
}

export const accountRepository = {
  signUp,
  findAccount,
  getAccount,
};

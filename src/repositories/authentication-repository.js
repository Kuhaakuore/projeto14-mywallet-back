import { db } from "../config/database.js";

export async function findSession(token) {
  return await db.collection("sessions").findOne({ token });
}

export async function deleteAccountPreviousSessions(accountId) {
  await db.collection("sessions").deleteMany({ accountId });
}

export async function createSession(accountId, token) {
  await db.collection("sessions").insertOne({ accountId, token });
}

export const authenticationRepository = {
  findSession,
  deleteAccountPreviousSessions,
  createSession,
};
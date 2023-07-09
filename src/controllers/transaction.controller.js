import { db } from "../database/database.connection.js";

export async function createTransaction(req, res) {
  const { session } = res.locals;
  const  type  = req.params.tipo;
  const { value, description, date } = req.body;

  try {
    await db
      .collection("transactions")
      .insertOne({ userId: session.userId, value, type, description, date });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

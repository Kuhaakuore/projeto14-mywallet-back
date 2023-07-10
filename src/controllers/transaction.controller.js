import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb"

export async function createTransaction(req, res) {
  const { session } = res.locals;
  const type = req.params.tipo;
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

export async function getTransactions(req, res) {
  const { session } = res.locals;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();
    const user = await db.collection("users").findOne({ _id: session.userId });
    const name = user.name;
    return res.send({ transactions, name });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function deleteTransaction(req, res) {
  const { _id } = req.body;

  try {
    const result = await db.collection("transactions").deleteOne({ _id : new ObjectId(_id) });
    if (result.deletedCount === 0) return res.status(404).send({ message: "Essa receita não existe!" })
    return res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

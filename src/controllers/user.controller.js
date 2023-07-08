import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user) return res.status(409).send({ message: "E-mail já cadastrado" });

    const hash = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({
      name,
      password: hash,
      email,
      balance: 0,
      transactions: [],
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}

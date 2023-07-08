import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(409).send("Usuário não cadastro!");

    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (!passwordValidation) return res.status(401).send("Senha incorreta");

    await db.collection("sessions").deleteMany({ userId: user._id });
    const token = uuid();
    await db.collection("sessions").insertOne({ token, userId: user._id });

    return res.status(200).send(token);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

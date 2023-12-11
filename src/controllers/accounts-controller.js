import httpStatus from "http-status";
import { accountService } from "../services/accounts-service.js";

export async function signUp(req, res) {
  const signUpData = req.body;

  await accountService.signUp(signUpData);

  return res.sendStatus(httpStatus.CREATED)
}

export async function signIn(req, res) {
  const signInData = req.body;

  const token = await accountService.signIn(signInData);

  return res.status(httpStatus.OK).send(token);
}

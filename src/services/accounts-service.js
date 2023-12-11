import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { accountRepository } from "../repositories/accounts-repository.js";
import { emailAlreadyRegisteredError } from "../errors/email-already-registered-error.js";
import { userNotRegisteredError } from "../errors/user-not-registered-error.js";
import { incorrectPasswordError } from "../errors/incorrect-password-error.js";
import { authenticationRepository } from "../repositories/authentication-repository.js";

export async function signUp(data) {
  const { email, password } = data;

  await validateEmailOrFail(email);

  const hash = bcrypt.hashSync(password, 10);

  const accountData = {
    ...data,
    password: hash,
  };

  await accountRepository.signUp(accountData);
}

export async function signIn(data) {
  const { email, password } = data;

  const account = await findAccountOrFail(email);

  validatePasswordOrFail(password, account.password);

  await authenticationRepository.deleteAccountPreviousSessions(account._id);
  const token = uuid();
  await authenticationRepository.createSession(account._id, token);

  return token;
}

function validatePasswordOrFail(password, hash) {
  const passwordValidation = bcrypt.compareSync(password, hash);
  if (!passwordValidation) throw incorrectPasswordError();
}

async function findAccountOrFail(email) {
  const account = await accountRepository.findAccount(email);
  if (!account) throw userNotRegisteredError();
  return account;
}

async function validateEmailOrFail(email) {
  const account = await accountRepository.findAccount(email);
  if (account) throw emailAlreadyRegisteredError();
}

export const accountService = {
  signUp,
  signIn,
};

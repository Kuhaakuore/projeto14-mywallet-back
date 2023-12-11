import { unauthorizedError } from "../errors/index.js";
import { authenticationRepository } from "../repositories/index.js";

export async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError();

  const token = authorization?.replace("Bearer ", "");
  if (!token) throw unauthorizedError();

  const session = await authenticationRepository.findSession(token);
  if (!session) throw unauthorizedError();

  res.locals.session = session;

  next();
}

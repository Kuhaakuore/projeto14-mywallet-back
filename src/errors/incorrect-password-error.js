import httpStatus from "http-status";

export function incorrectPasswordError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "Senha incorreta.",
  };
}
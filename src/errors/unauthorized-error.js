import httpStatus from "http-status";

export function unauthorizedError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "Você deve estar logado para acessar este recurso.",
  };
}

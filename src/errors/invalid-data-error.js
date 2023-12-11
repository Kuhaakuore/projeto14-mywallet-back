import httpStatus from "http-status";

export function invalidDataError(details) {
  return {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    message: `Dados inválidos: ${details}`,
  };
}

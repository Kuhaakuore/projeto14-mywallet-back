import httpStatus from "http-status";

export function transactionNotFound() {
  return {
    status: httpStatus.NOT_FOUND,
    message: "Transação inexistente!",
  };
}

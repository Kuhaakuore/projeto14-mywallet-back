import httpStatus from "http-status";

export function unauthorizedError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "Unauthorized",
  };
}

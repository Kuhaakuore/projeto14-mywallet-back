import httpStatus from "http-status";

export function emailAlreadyRegisteredError() {
  return {
    status: httpStatus.CONFLICT,
    message: "Email already registered",
  };
}

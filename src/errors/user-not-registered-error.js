import httpStatus from "http-status";

export function userNotRegisteredError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "User not registered",
  };
}
import httpStatus from "http-status";

export function handleApplicationErrors(err, _req, res, next) {
  if (!err.status) {
    console.log(err);
  }
  return res
    .status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: err.message } || { message: "Internal server error." });
}

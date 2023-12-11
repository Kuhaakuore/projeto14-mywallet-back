import { invalidDataError } from "../errors/invalid-data-error.js";

export function validateBody(schema) {
  return validate(schema);
}

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      let errorMessage = "";
      error.details.forEach((d) => (errorMessage += d.message + " "));
      throw invalidDataError(errorMessage);
    }
  };
}

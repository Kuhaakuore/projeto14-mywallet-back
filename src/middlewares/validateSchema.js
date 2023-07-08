export function validateSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      let message = "";

      Array.from(errors).forEach((error) => {
        if (error.includes("email")) message += "Formato do email inválido!";
        if (error.includes("password")) message += "Senha deve ter no mínimo 3 caracteres!";
        if (error.includes("name")) message += "Nome inválido (campo obrigatório)!";
      });

      return res.status(422).send({ errors, message });
    }

    next();
  };
}

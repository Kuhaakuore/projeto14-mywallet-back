export function validateTransactionSchemas(schema) {
    return (req, res, next) => {
      const validation = schema.validate(req.body, {
        abortEarly: false,
      });
      
      if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        let message = "";
  
        Array.from(errors).forEach((error) => {
          if (error.includes("value")) message += "O valor da transação precisa ser um valor númerico positivo!\n";
          if (error.includes("description")) message += "A descrição da transação não pode ser vazia!\n";
          if (error.includes("date")) message += "Data inválida!\n";
        });
  
        return res.status(422).send({ errors, message });
      }
  
      next();
    };
  }
  
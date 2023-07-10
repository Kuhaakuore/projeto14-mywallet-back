import joi from 'joi';

export const transactionSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required(),
    date: joi.date().required(),
});

export const editTransactionSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required()
});
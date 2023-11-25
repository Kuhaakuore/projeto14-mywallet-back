import joi from 'joi';
import joiDate from '@joi/date';
const Joi = joi.extend(joiDate);

export const transactionSchema = Joi.object({
    value: Joi.number().positive().required(),
    description: Joi.string().required(),
    date: Joi.date().format("DD/MM").required(),
});

export const editTransactionSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required()
});
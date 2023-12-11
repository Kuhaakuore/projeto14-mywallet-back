import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(3).required(),
    name: joi.string().trim().required(),
});

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(3).required()
});
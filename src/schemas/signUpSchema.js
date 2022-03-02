import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(3).lowercase().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(3).required(),
});

import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

const userSignSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

export default { userSignSchema };

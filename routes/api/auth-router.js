import express from "express";

import { signUp } from "../../controllers/users/index.js";

import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.userSignUpSchema),
  signUp
);

export default authRouter;

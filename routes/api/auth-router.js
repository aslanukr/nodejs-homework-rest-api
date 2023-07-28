import express from "express";

import { signUp, signIn } from "../../controllers/users/index.js";

import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignSchema), signUp);

authRouter.post("/login", validateBody(userSchemas.userSignSchema), signIn);

export default authRouter;

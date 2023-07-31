import express from "express";

import {
  signUp,
  signIn,
  getCurrent,
  logout,
} from "../../controllers/users/index.js";

import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignSchema), signUp);

authRouter.post("/login", validateBody(userSchemas.userSignSchema), signIn);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

export default authRouter;

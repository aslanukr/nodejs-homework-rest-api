import express from "express";

import {
  signUp,
  signIn,
  getCurrent,
  logout,
  subscriptionUpdate,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../../controllers/users/index.js";

import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, resizeAvatar, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignSchema), signUp);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post(
  "/verify",
  validateBody(userSchemas.userEmailSchema),
  resendVerifyEmail
);

authRouter.post("/login", validateBody(userSchemas.userSignSchema), signIn);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscriptionSchema),
  subscriptionUpdate
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  updateAvatar
);

export default authRouter;

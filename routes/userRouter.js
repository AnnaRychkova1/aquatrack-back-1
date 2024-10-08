import express from "express";
import {
  register,
  login,
  logout,
  current,
  verifyEmail,
  forgotPassword,
  updateCustomPassword,
  countUsers,
  googleAuth,
  googleRedirect,
  resendVerificationEmail,
  generatePassword,
} from "../controllers/authControllers.js";
import { updAvatar, updDataUser } from "../controllers/usersControllers.js";
import authMiddleware from "../middlewares/auth.js";
import authPasswordMiddleware from "../middlewares/authPassword.js";
import {
  registerSchema,
  newPasswordSchema,
  loginSchema,
  verifySchema,
} from "../schemas/usersSchemas.js";
import uploadMiddleware from "../middlewares/uploadFileAvatar.js";

const userRouter = express.Router();

userRouter.get("/count", countUsers);
userRouter.post("/register", registerSchema, register);
userRouter.post("/login", loginSchema, login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/current", authMiddleware, current);
userRouter.get("/verify/:verificationToken", verifyEmail);
userRouter.post("/verify", verifySchema, resendVerificationEmail);
userRouter.post("/password/forgot", newPasswordSchema, forgotPassword);
userRouter.post("/password/generate", newPasswordSchema, generatePassword);
userRouter.post(
  "/password/update",
  authPasswordMiddleware,
  updateCustomPassword
);

userRouter.get("/google", googleAuth);
userRouter.get("/google-redirect", googleRedirect);

userRouter.patch(
  "/update",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updDataUser
);
userRouter.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updAvatar
);

export default userRouter;

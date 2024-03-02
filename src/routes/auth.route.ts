import { accountVerification, googleAuth, login, logout, newPassword, passwordReset, signup, verificationForPasswordReset } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import express from "express";

const authRoute = express.Router();

//
authRoute.post("/account-verification", accountVerification);
authRoute.get("/logout", requireAuth, logout);
authRoute.get("/google", googleAuth);
authRoute.post("/signup", signup);
authRoute.post("/login", login);

// Password reset
authRoute.post("/password-reset/verification", verificationForPasswordReset);
authRoute.post("/password-reset/new-password", newPassword);
authRoute.post("/password-reset", passwordReset);

export default authRoute;
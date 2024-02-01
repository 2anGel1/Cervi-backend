import vine from "@vinejs/vine";
import { googleAccessTokenSchema, sessionIdSchema, usernameSchema } from "./schemas";
import { accountVerificationSchema, loginSchema, newPasswordSchema, passwordResetSchema, signupSchema, verificationForPasswordResetSchema } from "./objects";

//
export const verificationForPasswordResetValidator = vine.compile(verificationForPasswordResetSchema);
//
export const accountVerificationValidator = vine.compile(accountVerificationSchema);
//
export const googleAccessTokenValidator = vine.compile(googleAccessTokenSchema);
//
export const passwordResetValidator = vine.compile(passwordResetSchema);
//
export const newPasswordValidator = vine.compile(newPasswordSchema);
//
export const sessionIdValidator = vine.compile(sessionIdSchema);
//
export const usernameValidator = vine.compile(usernameSchema);
//
export const signupValidator = vine.compile(signupSchema);
//
export const loginValidator = vine.compile(loginSchema);


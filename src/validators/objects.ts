import { accountTypeSchema, codeShema, emailSchema, firstNameSchema, jwtSchema, lastNameSchema, passwordSchema } from "./schemas";
import vine from "@vinejs/vine";

//
export const signupSchema = vine.object({ accountType: accountTypeSchema, firstName: firstNameSchema, lastName: lastNameSchema, password: passwordSchema, email: emailSchema });
//
export const updateUserFirstNameAndLastNameSchema = vine.object({ firstName: firstNameSchema, lastName: lastNameSchema });
//
export const updateUserPasswordSchema = vine.object({ currentPassword: passwordSchema, newPassword: passwordSchema });
//
export const verificationForPasswordResetSchema = vine.object({ token: jwtSchema, code: codeShema });
//
export const newPasswordSchema = vine.object({ newPassword: passwordSchema, token: jwtSchema });
//
export const accountVerificationSchema = vine.object({ token: jwtSchema, code: codeShema });
//
export const loginSchema = vine.object({ password: passwordSchema, email: emailSchema });
//
export const passwordResetSchema = vine.object({ email: emailSchema });
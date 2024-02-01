import vine from "@vinejs/vine";

//
export const accountTypeSchema = vine.string().minLength(1).maxLength(15);
///
export const firstNameSchema = vine.string().minLength(1).maxLength(50);
//
export const passwordSchema = vine.string().minLength(8).maxLength(100);
//
export const lastNameSchema = vine.string().minLength(1).maxLength(50);
//
export const usernameSchema = vine.string().minLength(3).maxLength(50);
//
export const sessionIdSchema = vine.string().maxLength(400);
//
export const codeShema = vine.string().fixedLength(6);
//
export const googleAccessTokenSchema = vine.string();
//
export const emailSchema = vine.string().email();
//
export const jwtSchema = vine.string().jwt();
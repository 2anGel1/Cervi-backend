import { updateUserFirstNameAndLastNameSchema, updateUserPasswordSchema } from "./objects";
import vine from "@vinejs/vine";

//
export const updateUserFirstNameAndLastNameValidator = vine.compile(updateUserFirstNameAndLastNameSchema);
//
export const updateUserPasswordValidator = vine.compile(updateUserPasswordSchema);


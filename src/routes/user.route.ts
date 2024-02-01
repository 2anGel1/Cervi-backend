import { getLoggedInUser, } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { Router } from "express";

const userRoute = Router();

//
userRoute.get("/user", requireAuth, getLoggedInUser);

//   userRoute.put("/user/password", requireAuth, updateUserPassword);
//   userRoute.put("/user/firstname-and-lastname", requireAuth, updateUserFirstNameAndLastName);
//   userRoute.put("/user/email", requireAuth, updateUserEmail);

export default userRoute;

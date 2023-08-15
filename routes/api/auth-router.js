import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controllers.js";
import { upload, authenticate } from "../../middlewares/index.js";

const userSignupValidate = validateBody(usersSchemas.userSignupSchema);
const userSigninValidate = validateBody(usersSchemas.userSigninSchema);
const userEmailValidate = validateBody(usersSchemas.userEmailSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;

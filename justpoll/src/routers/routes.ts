import { Router } from "express";
import { RegistrationController } from "../controllers/registration.controller";
const  Controller = require("../controllers/signup.controller")
const router=Router();

router.post("/sign-up",Controller.signUp);
router.post("/verifyotp",Controller.verifyOtp);
router.post("/registration",RegistrationController.registration);
router.post("/login",RegistrationController.login);
export {router};
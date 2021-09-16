import { Router } from "express";
import {  UserController} from "../controllers/user.controller";

const router=Router();

router.post("/sign-up",UserController.signup);
router.post("/verifyotp",UserController.verifyotp);
router.post("/registration",UserController.registration);
router.post("/login",UserController.login);
export {router};
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import dotenv from "dotenv";
import { getManager } from "typeorm";
import { UserRepository } from "../database/users/repo/user.repo";

dotenv.config();
export class UserController {
  static async registration(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.registartion(req, res);
  }
  static async signup(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.signup(req, res);
  }
  static async verifyotp(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.verifyotp(req, res);
  }
  static async login(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.login(req, res);
  }

}

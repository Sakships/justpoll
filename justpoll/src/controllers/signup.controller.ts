// import { Response, Request } from "express";
// import dotenv from "dotenv";
// import { getManager } from "typeorm";
// import { UserRepository } from "../database/users/repo/user.repo";

// dotenv.config();
// export class SignUpController {
//   static async signUp(req: Request, res: Response) {
//     let connectionmanager = getManager().getCustomRepository(UserRepository);
//     await connectionmanager.signUp(req, res);
//   }
// }

import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../database/users/entities/user.entity";
import { Request, Response } from "express";
import twilio from "twilio";
import dotenv from "dotenv";


const accountSid= process.env.TWILIO_ACC_SID
const authToken=process.env.TWILIO_AUTH_TOKEN
const serviceId="VA754e38eddefa38fffe895f674f99a304"
const client=require("twilio")("ACfe5d105d4d8556fef3b136602f3f9767","206a3fa998f38bf16a68f52e56d276b2");
//dotenv.config();    
// @EntityRepository(UserEntity)

// export class UserRepository extends Repository<UserEntity> {
  //!Create a new user
//   module Controller{
  export async function signUp(req: Request, res: Response) {
     var {phonenumber} = req.body;
     try {
         console.log("----------",phonenumber)
        await client.verify
            .services(serviceId)
            .verifications.create({ to: phonenumber, channel: "sms" })
         res.send ("OTP SENT")          
        console.log('OTP sent successfully')
        
    }
    catch (error) {
        console.log(error)
    };
   
  }
  export async function verifyOtp(req:Request, res:Response) {
    // console.log("hi");
    const { phonenumber, code } = req.body;
    try {
        // console.log(number)
        const verificationCheck = await client.verify
            .services(serviceId)
            .verificationChecks.create({ to: phonenumber, code })
            res.send("Verified Succesfully")
        // console.log(verificationCheck.valid)
        // if (verificationCheck.valid ) {
        //     const userDetails = await User.findOne({ "phoneNumber": phonenumber });
        //     const checkDetails = (userDetails!=null)?true:false;
        //     // console.log(checkDetails)
        //         ctx.body = {
        //             statusCode: 200,
        //             message: 'Login successful.',
        //             data: { 
        //                 isProfileCompleted: checkDetails,
        //                 isVerificationSuccessful:verificationCheck.valid,
        //                 userDetails: checkDetails ? await userDataResponseWithToken(userDetails) : null  
        //             }
                //  }
        //         return next();   
        }
        // else {
        //     // ctx.body = {
        //     //     statusCode: 400,
        //     //     error: 'INVALID_OTP',
        //     //     message: 'Please enter correct OTP'
        //     // }
        //     res.send("Incorrect OTP")
        // }
  //  }
    catch (error) {
       console.log(error)
        // ctx.status = 200
        // ctx.body = serverErrorMsg(error)
    };
}
//}

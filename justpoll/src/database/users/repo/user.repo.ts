// import { EntityRepository, Repository } from "typeorm";
// import { UserEntity } from "../entities/user.entity";
// import { Request, Response } from "express";
// import twilio from "twilio";
// import dotenv from "dotenv";

// // import  userOtp from "../../../ormconfig";

// // const client = require("twilio")(userOtp.accountSid, userOtp.authToken);
// const accountSid= process.env.TWILIO_ACC_SID
// const authToken=process.env.TWILIO_AUTH_TOKEN
// const serviceId="VA754e38eddefa38fffe895f674f99a304"
// const client=require("twilio")("ACfe5d105d4d8556fef3b136602f3f9767","206a3fa998f38bf16a68f52e56d276b2");
// //dotenv.config();    
// // @EntityRepository(UserEntity)

// // export class UserRepository extends Repository<UserEntity> {
//   //!Create a new user
//   console.log('outside',serviceId);
  
//   module Controller{
//   export async function signUp(req: Request, res: Response) {
//      var {phonenumber} = req.body;
//      try {
//         console.log('-----------')
//          console.log('----------',phonenumber)
         
//         await client.verify
//             .services(serviceId)
//             .verifications.create({ to: phonenumber, channel: "sms" })
//          res.send ("OTP SENT")          
//         console.log('OTP sent successfully')
        
//     }
//     catch (error) {
//         console.log(error)
//     };
   
//   }
// }

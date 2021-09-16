import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

const accountSid = process.env.TWILIO_ACC_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceId = process.env.TWILIO_SERVICE_ID
const client = require("twilio")(accountSid, authToken);
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {


  async signup(req: Request, res: Response) {
    var { phonenumber } = req.body;
    try {
      let numberExists =
        (await this.createQueryBuilder("users")
          .where("users.phonenumber = :query", { query: phonenumber })
          .getCount()) > 0; //Output is boolean

      if (numberExists) {
        return res.send({
          authentication: false,
          data: "User already register, Please Log-In!",
        });
      } else {
        console.log("----------", phonenumber)
        console.log(authToken);
        console.log(serviceId);



        await client.verify
          .services(serviceId)
          .verifications.create({ to: phonenumber, channel: "sms" })
        res.send("OTP SENT")
        console.log('OTP sent successfully')

      }
    }
      catch (error) {
        console.log(error)
      };
    }
    
  async verifyotp(req: Request, res: Response) {
      // console.log("hi");
      const { phonenumber, code } = req.body;
      try {
        // console.log(number)
        const verificationCheck = await client.verify
          .services(serviceId)
          .verificationChecks.create({ to: phonenumber, code })
        res.send("Verified Succesfully")
      }
      catch (error) {
        console.log(error)

      };
    }

async registartion(req: Request, res: Response) {
      let { username, email, userpassword, displayname, gender, phonenumber, bio, isverified, profileimage, socialmedialinks, ispremiumuser, postcount, followerscount, followingcount, createdat } = req.body;
      let isValidated = EmailValidator.validate(email);
      let jwt_secret = "hiiamsakshisethiiamfromabohar"

      //If the email is fraud or invalid
      if (!isValidated) {
        return res.send({
          authentication: false,
          data: "Invalid email",
        });
      }

      //!Check if the user already exists in database or not
      let emailExists =
        (await this.createQueryBuilder("users")
          .where("users.email = :query", { query: email })
          .getCount()) > 0; //Output is boolean

      if (emailExists) {
        return res.send({
          authentication: false,
          data: "Email is taken, Try another one!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        bcrypt.hash(
          //!HMAC
          userpassword,
          salt,
          async (error: any, hashedpassword: any) => {
            if (error) {
              return res.send({
                authentication: false,
                data: error,
              });
            } else {
              //! Creating new user
              let user = new UserEntity();
              user.username = username;
              user.userpassword = hashedpassword; //! Adding hashed password instead of plain
              user.email = email;
              user.bio = bio;
              user.displayname = displayname;
              user.gender = gender;
              user.phonenumber = phonenumber;
              user.ispremiumuser = ispremiumuser;
              
              user.profileimage = profileimage;
              user.isverified = isverified;
              user.createdat = createdat;
              user.socialmedialinks = socialmedialinks;

              //!Saving the user
              await this.save(user);
              //! Create JWT => Sign jwt
              let userid = this.createQueryBuilder("users")
                .select("users.id")
                .where("users.email = :query", { query: email })
                .getOne();

              jwt.sign(
                {
                  useremail: email,
                },
                jwt_secret,
                {
                  expiresIn: "2h",
                },
                async (error: any, authData: any) => {
                  if (error) {
                    return res.send({
                      authentication: false,
                      data: error,
                    });
                  } else {
                    return res.send({
                      authentication: true,
                      data: authData,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  async login(req: Request, res: Response) {
      let { email, newuserpassword } = req.body;
      let isValidated = EmailValidator.validate(email);
      let jwt_secret = process.env.JWT_SECRET as string;

      if (!isValidated) {
        return res.send({
          authentication: false,
          data: "Invalid email",
        });
      } else {
        //! Find the user password from the database
        let findUserPasswordFromDb = await this.createQueryBuilder("users")
          .select("users.userpassword")
          .where("users.email = :query", { query: email })
          .getOne();
        //! Find the user id from the database
        let userId = await this.createQueryBuilder("users")
          .select("users.id")
          .where("users.email = :query", { query: email })
          .getOne();

        bcrypt.compare(
          newuserpassword,
          findUserPasswordFromDb?.userpassword as string,
          (error: any, isPasswordMatched: any) => {
            console.log(newuserpassword, findUserPasswordFromDb?.userpassword);
            if (error) {
              return res.send({
                authentication: false,
                data: error,
              });
            }
            if (!isPasswordMatched) {
              return res.send({
                authentication: false,
                data: "Incorrect password",
              });
            }
            if (isPasswordMatched) {
              jwt.sign(
                {
                  email: email,
                },
                jwt_secret,
                {
                  expiresIn: "2h",
                },
                async (error: any, authdata: any) => {
                  if (error) {
                    return res.send({
                      authentication: false,
                      data: error,
                    });
                  } else {
                    return res.send({
                      authentication: true,
                      data: authdata,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }

  }

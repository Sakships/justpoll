//  const userOtp = {
//     accountSid : process.env.TWILIO_ACC_SID || 'ACfe5d105d4d8556fef3b136602f3f9767',
//     authToken : process.env.TWILIO_AUTH_TOKEN || '206a3fa998f38bf16a68f52e56d276b2',
//     serviceId : process.env.TWILIO_SERVICE_ID || 'VA7f6183acde5ffec3b7d8d0db76faba1e'
// }
// export = userOtp;
import { join } from "path";
import { ConnectionOptions } from "typeorm";
import { UserEntity } from "./database/users/entities/user.entity";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456789",
  database: "postgres",
  entities: [UserEntity],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  logger: "debug",
  migrations: [join(__dirname, "src/migration/**/*.ts")],
};

export = connectionOptions;
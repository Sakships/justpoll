
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ppid } from "process";
import { createConnection, ConnectionOptions } from "typeorm";
import config from "./ormconfig";
import { router } from "./routers/routes";

dotenv.config();
createConnection(config as ConnectionOptions)
  .then(async (connection) => {
    if (connection.isConnected) {
      console.log(`📅 is connected!!`);
    }
const app= express()
const port= process.env.PORT||8000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.set("port", port);
app.get("/",router)
app.use("/users", router);

app.listen(app.get("port"), () => {
    console.log(`Server is rocking at ${app.get("port")} 🚀`);
  });
})
.catch((error) => {
  console.log(error);
});
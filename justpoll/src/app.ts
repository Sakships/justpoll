
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ppid } from "process";
import { router } from "./routers/routes";

dotenv.config();
const app= express()
const port= process.env.PORT||8000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.set("port", port);
app.get("/",router)
app.listen(app.get("port"), () => {
    console.log(`Server is rocking at ${app.get("port")} 🚀`);
  });
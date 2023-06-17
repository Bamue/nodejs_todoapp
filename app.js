import express from "express"; 
import userRouter from "./routes/user.js"; 
import {config} from "dotenv"; 
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js"; 
import cors from "cors";

config({
    path:"./data/config.env"
});

export const app=express();
app.use(express.json()); //express.json() comes first than userRouter
app.use(cookieParser()); 
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET",'POST','PUT','DELETE'],
    credentials:true,
}));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter); 

app.use(errorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`server is working man on: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

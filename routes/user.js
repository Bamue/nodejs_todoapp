import express from "express"; 
import { isAuthenticated } from "../middlewares/auth.js";
import {getAllUsers,login,register,getMyProfile,logout} from "../controller/user.js";
const router=express.Router(); 
router.get("/all",getAllUsers);  
router.get("/",(req,res)=>{
    res.send("Nice working");
}); 

//router.route("/userid/:id").get(getMyProfile);
router.get("/me",isAuthenticated,getMyProfile);
router.post("/new",register);
router.post("/login",login); 
router.get("/logout",logout);
//router.get("/userid/:id",getthere);
//router.put("/userid/:id",updateUser); 
//router.delete("/userid/:id",deleteUser);


export default router;


import mongoose from "mongoose"; 
export const connectDB=()=>{mongoose.connect(process.env.MONGO_URI)
.then((c)=>{console.log(`connected to database boss ${c.connection.host}`)})
.catch((e)=>console.log(e)); 
};


import mongoose from "mongoose"
import { DB_URI } from "../constants.js"

export const connectDB = async()=>{
    try{

        const connection = await mongoose.connect(DB_URI)
        console.log(connection.connection.host)
    }
    catch(err){
        console.log(err)
        console.log("failed to connect to DB hahaha")
        process.exit(0);
    }
}
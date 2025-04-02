import express from "express"
import { frontend_URI, PORT } from "./constants.js";
import cors from "cors"
import { EditorRouter } from "./routes/editors.routes.js";
import { connectDB } from "./db/config.js";
import { TaskRouter } from "./routes/tasks.routes.js";

const app = express();
connectDB();

app.use(cors({origin:frontend_URI}))
app.use(express.json())

app.use("/editors",EditorRouter)
app.use("/tasks", TaskRouter)
app.get('/healthcheck', (req, res)=>{
    return res.status(200).json({message:"Server working properly"})
})

//global error middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error details for debugging
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });

app.listen(PORT,()=>{
    console.log("server listening on port: "+PORT);
} )
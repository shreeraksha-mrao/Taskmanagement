import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    taskdescription:{
        type:String,
        required:true
    },
    assignedto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Editor"
    },
    image:{
        type:String,
        required:true
    }
})

const Task = mongoose.model("Task",taskSchema);
export default Task;

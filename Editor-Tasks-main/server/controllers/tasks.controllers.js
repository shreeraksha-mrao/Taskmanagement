import ApiError from "../ApiError.js";
import Task from "../models/tasks.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import Editor from "../models/editors.models.js"

export const getTasks = async (req, res, next) => {
    try {
        console.log("came inside get tasks")
        const data = await Task.find();
        if (data.length == 0) return res.status(204).send();
        return res.status(200).json({ message: "All the tasks retrieved successfully", data })
    }
    catch (err) {
        next(err)
    }
}

export const addTask = async (req, res, next) => {
    try {
        console.log("came inside add task")
        const { taskdescription, assignedto } = req.body;
        console.log("Uploaded File:", req.file); // Debugging multer

        if (!taskdescription) throw new ApiError("Task description must be provided", 400);

        const image = req.file?.path;
        if (!image) throw new ApiError("Image must be provided", 400);

        // Upload to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(image);
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            throw new ApiError("Failed to upload image to Cloudinary", 500);
        }

        let task
        if (assignedto) {
            task = await Task.create({
                taskdescription,
                assignedto,
                image: cloudinaryResponse.url
            });
        }
        else {
            task = await Task.create({
                taskdescription,
                image: cloudinaryResponse.url
            });
        }




        return res.status(201).json({
            message: "Task added successfully",
            data: task
        });
    } catch (err) {
        next(err);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        console.log("came inside gettaskbyid")
        const { id } = req.params
        const data = await Task.findById(id).populate("assignedto", "-password")

        //if i want to exclude a particular field from ediors model
        // const data = await Task.findById(id).populate("assignedto","-rating")

        //if you want to exclue something in the tasks model than do .select("-field") before or after populate

        if (data == null) {
            const err = new ApiError("The task could not be retrieved", 404);
            next(err);
        }

        return res.status(200).json({ message: "The task retrieved successfully", data })
    }
    catch (err) {
        next(err);
    }
}

export const deleteTaskById = async (req, res, next) => {
    try {
        console.log("came inside deletetask")
        const { id } = req.params
        const data = await Task.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted successfully", data });
    }
    catch (err) {
        next(err);
    }
}

export const updateTaskById = async (req, res, next) => {
    try {
        console.log("came inside update task")
        const { id } = req.params
        let { taskdescription, assignedto } = req.body;
        console.log(assignedto)
        
        const image = req.file?.path;
        if (!image) throw new ApiError("Image must be provided", 400);

        // Upload to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(image);
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            throw new ApiError("Failed to upload image to Cloudinary", 500);
        }
       
        
        const updatedtask = { taskdescription, assignedto, image: cloudinaryResponse.url }
        //The { new: true } option  ensures that the updated document is returned instead of the old one.
        const task = await Task.findByIdAndUpdate(id, updatedtask, { new: true });
        return res.status(200).json({ message: "The task updated successfully", data: task })
    }
    catch (err) {
        next(err);
    }
}

export const nonAssingedTasks = async(req, res, next)=>{
    try{
        const unassignedTasks = await Task.find({ assignedto: { $exists: false } });
        return res.status(200).json({ message: "The task fetched successfully", data: unassignedTasks })
    }
    catch(err){
        next(err);
    }
}

export const assignEditor = async (req, res, next) => {
    try {
        const { taskId, editorId } = req.body;

        // Validate input
        if (!taskId || !editorId) {
            return res.status(400).json({ message: "Both taskId and editorId are required" });
        }

        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if editor exists
        const editor = await Editor.findById(editorId);
        if (!editor) {
            return res.status(404).json({ message: "Editor not found" });
        }

        // Assign editor to the task
        task.assignedto = editorId;
        await task.save();

        return res.status(200).json({
            message: "Editor assigned successfully",
            data: task
        });
    } catch (err) {
        next(err);
    }
};

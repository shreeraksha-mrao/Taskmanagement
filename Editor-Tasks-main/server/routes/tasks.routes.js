import { addTask, assignEditor, deleteTaskById, getTaskById, getTasks, nonAssingedTasks, updateTaskById } from "../controllers/tasks.controllers.js";
import { Router } from "express";
export const TaskRouter = Router();
import { upload } from "../middleware/multer.middleware.js";


TaskRouter.route("/").get(getTasks);
TaskRouter.route('/').post(upload.single("image"),addTask);
TaskRouter.route('/assignEditor').patch(assignEditor);
TaskRouter.route('/nonAssignedTasks').get(nonAssingedTasks);
TaskRouter.route('/:id').get(getTaskById)
TaskRouter.route('/:id').delete(deleteTaskById)
TaskRouter.route('/:id').patch(upload.single("image"),updateTaskById)


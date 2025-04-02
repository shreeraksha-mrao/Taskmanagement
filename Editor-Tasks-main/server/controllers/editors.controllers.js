import ApiError from "../ApiError.js";
import Editor from "../models/editors.models.js"

export const getEditor  = async(req,res,next)=>{
    //retrieve all the editors
    try{
        const data =  await Editor.find();
        //The request was successful, but there is no data to send back in the response
        if(data.length == 0) return res.status(204).send();
        return res.status(200).json({message:"Editors retrieved successfully", data:data})
    }
    catch(err){
        next(err);
    }
}

export const postEditor = async(req,res,next)=>{
    try{
        const {name, rating, password} = req.body;
        console.log(req.body)
        console.log(name)
        console.log(rating)
        if(name == null || rating == null || password == null){
            const err = new ApiError("All details are not present to add a editor", 400);
            next(err);
        }
        const data = await Editor.create({ name, rating, password });
        return res.status(201).json({message:"Editor posted successfully", data:data})
    }
    catch(err){
        next(err);
    }
}

export const getEditorById = async(req,res,next)=>{
    try{
        const {id} = req.params
        const data = await Editor.findById(id);
        if(data == null){
            const err = new ApiError("Editor details not found", 404);
            next(err);
        } 
        return res.status(200).json({message:"Editor retrieved successfully", data});

    }
    catch(err){
        next(err);
    }
}

export const updateEditorById = async(req, res, next)=>{
    try{
        console.log("came inside updateEditorbyId")
        const {id} = req.params
        const data = req.body
        console.log(data)
        let updatededitor = await Editor.findById(id)
        updatededitor.name = data.name
        updatededitor.rating = data.rating
        updatededitor.password = data.password; // Pre-save middleware will check and handle hash it

        await updatededitor.save()

        
        return res.status(200).json({message:"Edited successfully", data:updatededitor})
    }
    catch(err){
        next(err);
    }
}

export const deleteEditorById = async(req,res,next)=>{
    try{
        const {id} = req.params
        const deleted = await Editor.findByIdAndDelete(id);
        return res.status(200).json({message:"Deleted successfully", data:deleted});
    }
    catch(err){
        next(err);
    }
}
//dummy end point
export const addPassword = async(req,res,next)=>{
    try{
        console.log("aaayo")
        const {password} = req.body;
        await Editor.updateMany({},{$set:{password}})
        return res.status(200).json({message:"updates successfully"});
    }
    catch(err){
        next(err)
    }
}
export const pseudoLogin = async(req,res,next)=>{
    try{
        console.log("came inside pseudo login")
        console.log('aayo')
        const {name,password} = req.body;
        const editor = await Editor.findOne({ name });
        if (!editor) {
           throw new ApiError("Editor not found",404);
        }
        const ismatch = await editor.isPasswordCorrect(password);
        if(ismatch) return res.status(200).json({message:"Login successful"});
        else throw new ApiError("Incorrect password or username",401)
        
    }
    catch(err){
        next(err);
    }
}


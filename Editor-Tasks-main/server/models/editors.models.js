import mongoose from "mongoose"
import bcrypt from "bcrypt"
const editorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required: true
    }
})
//this is for hashing the password as the user enters it. we need to do it before every save and only if the password is modified
//The next() here ensures that after the password is hashed, Mongoose will proceed with saving the document.
editorSchema.pre("save", async function(next){
    console.log("password pre aayo")
    if(this.isModified("password")){
        console.log("password pre andar aayo")
        this.password = await bcrypt.hash(this.password,10)
        console.log("password hash hua")
        next();
    }
    next()
})

//comparing the passed password to the hashed password in the database
editorSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password)
}

const Editor = mongoose.model("Editor", editorSchema);
export default Editor;

import mongoose,{Schema} from "mongoose";

const skillsSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    description:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    type:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    images:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    }
})
export const Skills = new mongoose.model("Skills",skillsSchema,"Skills");
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,        
    },
    description:{
        type:String,
        require:true,        
    },
    photo:{
        type:String,
        require:true,        
    },
},{timestamps:true})

export default mongoose.model('Post',PostSchema)
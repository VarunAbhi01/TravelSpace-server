import mongoose from "mongoose";

//Mongoose schema is used to structure your data that is stored in mongodb database. this ensures that whatever data is stored in mongodb will be of this structure.
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);

export default mongoose.model("User",UserSchema)
import mongoose from "mongoose";

//Mongoose schema is used to structure your data that is stored in mongodb database. this ensures that whatever data is stored in mongodb will be of this structure.
const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,      
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    roomNumbers:[{number:Number, unavailableDates:{type:[Date]} }],
},
{timestamps:true}
);

export default mongoose.model("Room",RoomSchema)
import mongoose from "mongoose";

//Mongoose schema is used to structure your data that is stored in mongodb database. this ensures that whatever data is stored in mongodb will be of this structure.
const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
        required:true,
    },
    title:{
        // under which title we gonna show this hotel in website
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    rooms:{
        type:[String],
    },
    photos:{
        type:[String],
    },
    cheapestPrice:{
        type:Number,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
});

export default mongoose.model("Hotel",HotelSchema)
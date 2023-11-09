import User from "../models/User.js  "
// CREATE ----------------------------------
export const createUser=async(req,res,next)=>{
    const newUser = new User(req.body)

    try{
    // since this req is asynchronous operation we will use await to save the input user data  in User model format i.e.newHotel document into the final mongodb database under hotels collection with reference as savedHotel
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        next(err);
    }
}

//UPDATE ---------------------------
export const updateUser=async(req,res,next)=>{
    try{
        //we will req the id passed, change the data in prev one sent thru rqst using mongodb func set and to display changes we set new to true 
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,{$set:req.body},{new:true}
            );
            res.status(200).json(updatedUser)
        }catch(err){
            next(err)
        }
}

// DELETE -----------------------------------------------------
export const deleteUser=async(req,res,next)=>{
    try{
        //we no need to assign it to any variable as we are deleting.
            await User.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json("User deleted")
        }catch(err){
            next(err)
        }
}

// GET -----------------------------------------------------
export const getUser=async(req,res,next)=>{
    try{
        const User = await User.findById(
            req.params.id
        );
        res.status(200).json(User)
    }catch(err){
        next(err)
    }
}


// GETALL -----------------------------------------------------
export const getUsers=async(req,res,next)=>{
    try{
        //we no need to assign it to any variable as we are deleting.
            await User.find();
            res.status(200).json("User deleted")
        }catch(err){
            next(err)
        }
}
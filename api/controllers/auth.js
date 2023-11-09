import User from "../models/User.js" 
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt  from "jsonwebtoken";

// REGISTER --------------------------------------------------------------
export const register = async(req,res,next)=>{
    try{
// bcryptjs is used to hide the original password with some dummy password in database so as to secure it more. 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })

        await newUser.save()
        res.status(200).send("User has been successfully created")

    }
    catch(err){
        next(err) 
    }
}


// LOGIN ----------------------------------------------------------------------
export const login = async(req,res,next)=>{
    try{
    //checking if theres a user with credentials given created in User database 
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User doesn't exist!"))
    //checking the hashed password using compare function if its correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Username or Password incorrect!"))

// Json Web Token (jwt) are assigned to user upon successfull login. for further requests in app server will check the jwt token assigned to it using the secret key provided at last in params which is only known to server. 
        // We do this in order to avoid the asking the user for credentials all the time but to use the token for ease.     
        // hidden the secret key in env folder.
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT)

// saving the existing user details in the left variables. 
        const {password,isAdmin,...otherDetails } = user._doc;
// this cookie contains the session id of user which is given at the time of successfull login and httpOnly is given such that any clients secret is not exposed to cookie
// so first it checks our token adn after it checks our user detials if it matches then it allows us to do any CRUD to data
        res.cookie("access_token",token,{httpOnly:true,}).status(200).json({...otherDetails});

        res.status(200).json(user);
        }
    catch(err){
        next(err) 
    }
}
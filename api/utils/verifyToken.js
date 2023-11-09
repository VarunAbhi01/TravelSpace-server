import jwt from "jsonwebtoken"
import {createError} from "./error.js"

export const verifyToken = (req,res,next) =>{
// we will extract token from cookies and check
    const token = req.cookies.access_token;
// if theres no token error raises
    if(!token)
    {
        return next(createError(401,"You are not Authenticated"))
    }

    // tho token exists we need to check if its correct by giving secret key and getting user info like user id and isAdmin
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token is not valid"));
        req.user = user;
    // if everything is fine we will continue to further steps
        next();
    })
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
// checks the rqsted user id from given token and comapres to the user id which you want to delete if its 
// same so u r the owner nd u can, or else u must ne either Admin to do that deletion
        if(req.user.id === req.params.id  || req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(createError(403,"You are not the owner of this userId")); 
        }
    })
}


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
// checks the rqsted user id from given token and comapres to the user id which you want to delete if its 
// same so u r the owner nd u can, or else u must ne either Admin to do that deletion
        if( req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(createError(403,"You are not the owner of this userId")); 
        }
    })
}

import express from "express"

// this is express router used to handle routes fromm the main application
const router = express.Router()

import { createUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { deleteUser } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// // whenever we are on this address, we will go to the verifyToken page to run and get info from there 
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, you are authenticated")
// })
// // if you want to delete the user
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are allowed to delete")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello Admin, you are allowed to delete any account")
// })

//CREATE ------------------------------------------------------------
// post is used to send data to the server for creating,updating and deleting functions.
// req.body will req data in Hotel model structure and save in newHotel document
router.post("/",createUser);


// UPDATE ----------------------------------------------------
//put is used to UPDATE.here we will update hotel thru id of that hotel.
router.put("/:id",verifyUser,updateUser);


// DELETE --------------------------------------------------------------------
router.delete("/:id",verifyUser,deleteUser);

// GET ----------------------------------------------------------------------------
// to display the hotel data requested
router.get("/:id",verifyUser,getUser);

// GET ALL -----------------------------------------------------------------------
router.get("/",verifyAdmin,getUsers);


export default router
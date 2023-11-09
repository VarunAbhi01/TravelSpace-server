import express from "express"

// this is express router used to handle routes fromm the main application
const router = express.Router()

// code for these CRUD operations are written in controllers and imported here  
import { countByCity, countByType, createHotel } from "../controllers/hotel.js";
import { updateHotel } from "../controllers/hotel.js";
import { deleteHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getHotels } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


//CREATE ------------------------------------------------------------
// post is used to send data to the server for creating,updating and deleting functions.
// req.body will req data in Hotel model structure and save in newHotel document
router.post("/",verifyAdmin,createHotel);


// UPDATE ----------------------------------------------------
//put is used to UPDATE.here we will update hotel thru id of that hotel.
router.put("/:id",verifyAdmin,updateHotel);


// DELETE --------------------------------------------------------------------
router.delete("/:id",verifyAdmin,deleteHotel);



// GET ----------------------------------------------------------------------------
// to display the hotel data requested
// since all get rqsts are using similar syntax i.e. /:id so the countby functions are
// also being assumed as id so to alter that we used find here 
router.get("/find/:id",getHotel);

// GET ALL -----------------------------------------------------------------------
router.get("/",getHotels);



// to get hotels count belonging to a particular city
router.get("/countByCity", countByCity);
// to get count if types like hotels,apartments and so on
router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);

export default router; 
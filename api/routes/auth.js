import express from "express"
import { register, login } from "../controllers/auth.js"


// this is express router used to handle routes fromm the main application
const router = express.Router()

// GET is a common HTTP i.e. hypertext transfer protocol request that will be sent to the server once someone searches for the address mentioned below i.e. / home page, where user is asking the server to retrieve the information and send back as response
router.post("/register",register)
router.post("/login",login)

export default router
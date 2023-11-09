// to use this kind of syntax of import exprort, add module type in package.json
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";


//we created a mongodb databse from mongodb cloud site and stored its url in .env which is a secret key.......now we are able to connect to our data with this dotenv.config
import dotenv from "dotenv"
dotenv.config() 

//importing routes so as to use them
import authRoute from "./api/routes/auth.js"
import usersRoute from "./api/routes/users.js"
import hotelsRoute from "./api/routes/hotels.js"
import roomsRoute from "./api/routes/rooms.js"


//to connect our app to mongodb database we use mongoose and call this connect function in app.listen
import mongoose from "mongoose"
//the following connection to mongodb through mongoose is the initial one it means if this is disconnected server will not try to reconnect but once this works and the mongodb shows some error then i tries to reconnet agaion
const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Mongoose connected Mongodb to BACKEND")
      } catch (error) {
        throw error;
      }
}
//the following will let us know if the mongodb is working fine or not
mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb Disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("Mongodb Connected")
})

// created the app
const app = express()


//middlewares decides which request in which page i.e. url being handled by which route
app.use(cors())
//since we cant send json data i.e. our user data which is in json format directly to express server,so we use this middleware
app.use(express.json())
// cookies are used in storing the session ids given to user upon logging in. so in further rqsts server will identify the user thru jwt as well as this cookies which has this id, 
// so once theres an inactivity in user for period of time the session has a time out nd if it crosses the users logs otu automatically ensuring proper security in case fo users absence once logged in.  
app.use(cookieParser())

//whenever there is any kind of rqst like get or post to /auth url the specific mentioned Router will handle all those rqsts.  
// so if json data of hotel model format is posted i.e. sent to create, to /hotels url then hotels route will come into play and uses the post in its code to save the data in mongodb. 
app.use("/auth",authRoute)
app.use("/users",usersRoute)
app.use("/hotels",hotelsRoute)
app.use("/rooms",roomsRoute)






// now connecting app to a port number adn once done it will run the commands in the brackets
// to run this app change start module in scripts in package.json
app.listen(8000, ()=>{
    connect()
    console.log("BACKEND connected")
})


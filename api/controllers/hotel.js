
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

// CREATE ----------------------------------
export const createHotel=async(req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
    // since this req is asynchronous operation we will use await to save the input user data  in Hotel model format i.e.newHotel document into the final mongodb database under hotels collection with reference as savedHotel
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err);
    }
}

//UPDATE ---------------------------
export const updateHotel=async(req,res,next)=>{
    try{
        //we will req the id passed, change the data in prev one sent thru rqst using mongodb func set and to display changes we set new to true 
            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id,{$set:req.body},{new:true}
            );
            res.status(200).json(updatedHotel)
        }catch(err){
            next(err)
        }
}

// DELETE -----------------------------------------------------
export const deleteHotel=async(req,res,next)=>{
    try{
        //we no need to assign it to any variable as we are deleting.
            await Hotel.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json("Hotel deleted")
        }catch(err){
            next(err)
        }
}

// GET -----------------------------------------------------
export const getHotel=async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}


// GETALL -----------------------------------------------------
export const getHotels=async(req,res,next)=>{
    const { min, max, ...others } = req.query;
    try{
        //limit is used so only those no of hotels will be listed
        const hotels = await Hotel.find({
            ...others,
// to fetch hotels whose price is greater than min and lesser than max
            cheapestPrice: { $gt: min || 1, $lt: max || 999 },
          }).limit(req.query.limit);
        res.status(200).json(hotels)
        }catch(err){
            next(err)
        }
}

//   HOTELS count by city
export const countByCity = async (req, res, next) => {
// to get the cities asked in url search as query like /?cities:berlin,china
// split converts the obtained list of cities asked into an array seperated by commas
    const cities = req.query.cities.split(",");
    try {
// since there are many cities and we need to check for all v use promise.all
      const list = await Promise.all(
        cities.map((city) => {
// countDocuments is mongodb function used to count the no of hotels instead of extracting all properties using find function
          return Hotel.countDocuments({ city: city });
        })
      );
// list of hotel counts in those req cities are sent in res
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };


//   HOTELS count by type
  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount }, 
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
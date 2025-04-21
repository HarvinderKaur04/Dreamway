// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;
// const listingSchema=new Schema({
//     title:{
//         type:String,
//         require:true,
//     },
//     description:String,

//     image:{
//         type:String,
//         default:
//             "https://unsplash.com/photos/flowers-bloom-near-a-lake-with-mountains-in-view-MzjIPVnCFKM",
//         set:(v)=>
//             v ==="" 
//         ? "https://unsplash.com/photos/flowers-bloom-near-a-lake-with-mountains-in-view-MzjIPVnCFKM":v,
//     },
//     price:Number,
//     location:String,
//     country:String,
// });
// const Listing=mongoose.model("Listing",listingSchema);
// module.exports=Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    url:String,
    filename:String,
   
},
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  // geometry:{
  //   type:{
  //     type:String, // don't do '{locaion:{type:string}}'
  //     enum:["Point"], //location.type must be point
  //     required:true,
  //   },
  //   coordinates:{
  //     type:[Number],
  //     required:true,
  //   },
  // },
  // catagory:{
  //   type:String,
  //   enum:["rooms","treanding","IconicCities","mountains","Castles","AmazingPolls","Arctic"];
  // }
 
});



// Middleware of delete reviews with Listing
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

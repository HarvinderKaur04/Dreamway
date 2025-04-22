const Listing=require("../models/listing");

// mapBox 
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');// access service
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});// start service



// index router controllers
module.exports.index= async (req,res)=>{
    const allListings=await Listing.find({});
       res.render("listings/index.ejs",{allListings});
    };

// New controllers
module.exports.renderNewForm=(req,res)=>{
   res.render("listings/new.ejs")
};  

//show form controllers
module.exports.showRenderForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"},})
    .populate("owner");
    if(!listing)
    {
        req.flash("error","Listing dosn't exit");
        res.redirect("/listings");
    }
        console.log(listing);
       res.render("listings/show.ejs",{listing});
    };

 //create  form controllers
 module.exports.createRenderForm=async (req,res,next)=>{
  let response= await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send()
      
    //add path of file & filename of image
    let url=req.file.path;
    let filename=req.file.filename;
    //  console.log(url,"..",filename);
    const newListing=new Listing(req.body.listing);
    
     //add owner 
     newListing.owner=req.user._id;
     //adding image
     newListing.image={url,filename};

     //adding geomatry
     newListing.geometry=response.body.features[0].geometry;
 
   let savedListing= await newListing.save();
   console.log(savedListing);
     req.flash("sucess","New Listing is Created");
     res.redirect("/listings");
  }   

   //Edit  form controllers
 module.exports.editRenderForm=async (req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findById(id);
      if(!listing){
         req.flash("error","Listing not exist");
         res.redirect("/listings");
      }
      let originalImageUrl=listing.image.url;
      originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_250");
         res.render("listings/edit.ejs",{listing, originalImageUrl});
      };


  // Update form controllers
  module.exports.updateRenderForm=async (req,res)=>{
       let {id}=req.params;
       const listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});

      
       if(typeof req.file!=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
          
       listing.image={url,filename};

       await listing.save();
        }
       req.flash("sucess","Listing is Updated");
       res.redirect(`/listings/${id}`);
       };



   //Delete form controllers
 module.exports.deleteRenderForm= async (req,res)=>{
   let {id}=req.params;
   let del=await Listing.findByIdAndDelete(id);
   req.flash("sucess","Listing is Deleted");
   console.log(del)
   res.redirect("/listings");
   };



 
const Review=require("../models/review");
const Listing=require("../models/listing");



module.exports.createReview= async (req,res,next)=>{
       let listing= await Listing.findById(req.params.id);
       let newReview=new Review(req.body.review);
       newReview.author=req.user._id;
       console.log(newReview);
        listing.reviews.push(newReview);

       await newReview.save();
       await listing.save();
       req.flash("sucess","New Review Created");
       console.log("new Review Saved");
        // res.send("new Review Saved");
       res.redirect(`/listings/${listing._id}`);
 }

 //Delete Controller
 module.exports.deleteReview=async (req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","New Review Deleted");
    res.redirect(`/listings/${id}`);
    };
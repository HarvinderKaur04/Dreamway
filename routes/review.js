const express=require('express')
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js");



//Reviews //Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


//Delete  Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
    module.exports=router;    
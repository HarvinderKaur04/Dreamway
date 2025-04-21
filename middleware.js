const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");


// middlewre for validate listing
module.exports.validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body) ;   
    
    if(error){
        let errMsg=error.details.map((element)=>element.message).join("/");
     throw new ExpressError(400, error);
    }else{
        next();
    }
};


// middlewre for validate Reviews
module.exports.validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body) ;   
    
    if(error){
        let errMsg=error.details.map((element)=>element.message).join("/");
     throw new ExpressError(400, error);
    }else{
        next();
    }
};

// login middleware
module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        //redirect url
        // console.log(req.path,"..",req.orignalUrl);
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be login !");
        return res.redirect("/login");
    }
    next();
    }
    
    module.exports.saveRedirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl){
            res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
    };

    // is Owner Middleware
    module.exports.isOwner=async (req,res,next)=>{
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You Dont have Permission  you are not owner");
            return res.redirect(`/listings/${id}`);
        }
        next();
    };
// Is Author Middleware
module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You  are not Author of review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
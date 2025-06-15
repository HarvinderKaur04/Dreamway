

const express=require('express')
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing }=require("../middleware.js");
const ListingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

//use router.route method
//upload image use -upload.single('listing[image]')
// method for ("/")


//Index Route 
router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn ,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.createListing));


router.route("/listings")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn ,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.createRenderForm));


//method for ("/new")
// //NEW Route
router.get("/new",isLoggedIn,ListingController.renderNewForm);  

//  Search route BEFORE :id to avoid conflict
router.get("/search", wrapAsync(ListingController.searchListings));

// method for ("/:id")
router
.route("/:id")
.get(wrapAsync(ListingController.showRenderForm ))
.put(isLoggedIn ,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.updateRenderForm ))
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.deleteRenderForm))

// method for ("/:id/edit")
router
.route("/:id/edit")
.get(isLoggedIn ,isOwner,wrapAsync(ListingController.editRenderForm ));









// //NEW Route
// router.get("/new", isLoggedIn,ListingController.renderNewForm);   


// //Show Route(read)
// router.get("/:id",wrapAsync(ListingController.showRenderForm ));


// //Create Route with Asyncwrap method
// router.post("/",isLoggedIn ,validateListing,wrapAsync(ListingController.createRenderForm));

//  // Edit Route
//  router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(ListingController.editRenderForm ));
 
//  //Update Route
//  router.put("/:id",isLoggedIn ,isOwner,validateListing,wrapAsync(ListingController.updateRenderForm ));
 
 
//  //Delete Route
//  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(ListingController.deleteRenderForm));

module.exports=router;    
     
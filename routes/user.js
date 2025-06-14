const express=require('express')
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js")

/// using Router.route

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signUp))


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local', 
            { failureRedirect: '/login', failureFlash:true }),
            userController.login
    );

//logOut route
router.get("/logout", userController.logOut);




// //Sigup page
// router.get("/signup",userController.renderSignupForm);

// router.post("/signup",wrapAsync(userController.signUp));

// //Login Page 

//     router.get("/login",userController.renderLoginForm);


// router.post("/login", 
//     saveRedirectUrl,
//     passport.authenticate('local', 
//         { failureRedirect: '/login', failureFlash:true }),
//         userController.login
//         );
// //logOut route
// router.get("/logout", userController.logOut);
 
module.exports=router;

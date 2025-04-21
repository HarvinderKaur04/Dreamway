const User=require("../models/user");

//SignUp Controller

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
              next(err);
        }
        req.flash("sucess","New user registred");
        res.redirect("/listings");
    })
 
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

      };

// Login Controller
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login=(async(req,res)=>{
    req.flash("sucess","welcome to wonderLust");
    let redirectUrl=res.locals.redirectUrl || "\listings";
    res.redirect(redirectUrl);

});

//LogOut 
module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
    }
    req.flash("sucess","you logout from wonderLust");
    res.redirect("/listings");
}); 
}
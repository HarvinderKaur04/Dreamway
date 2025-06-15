if(process.env.NODE_ENV!="production")
{
    require('dotenv').config()
    // console.log(process.env)
}
const express= require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");


const flash =require('connect-flash');
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js")

//connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo');



const dburl=process.env.ATLASDB_URL;


const listingsRouter=require("./routes/listing.js")
const reviewsRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")



app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION StORE",err);
})


const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookies:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    },
};


// app.get('/',(req,res)=>{
//     res.send("Hi I am root")
// });

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.sucess=req.flash("sucess");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

//demo to create fakeuser by own
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"Std@gmail.com",
//         username:"sig-std"
//  });
//  let regUser=await User.register(fakeUser,"HiHarry");
//  res.send(regUser);
// });

app.use("/",listingsRouter);
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
// creating Database
main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

// database URL
// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
async function main() {
    await mongoose.connect(dburl);
}

app.listen(8080,()=>{
    console.log(`Server is working 8080 `);  
});




//check all route first and erroron invaild route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found."));
});  

//Middleware
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
// res.status(status).send(message); //without Error.ejs file
});

// app.listen(8080,()=>{
//     console.log(`Server is working 8080 `);  
// });






// //Create Route without Wrapasync method first method
// app.post("/listings", async (req,res,next)=>{
//     try{
//     const newListing=new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("listings");
//     }catch(err){
//         next(err);
//     }
//     });


// // app.get('/testListing',async(req,res)=>{
// //     let sam=new Listing({
// //     title:"my new vila",
// //     description:"by the Beach",
// //     price:1200,
// //     location:"london",
// //     country:"UK",
// // });
//    await sam.save();
//    console.log("Data save");
//    res.send("sucess");
   
// });




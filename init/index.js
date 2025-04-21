const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
// creating Database
main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB=async () => {
    await Listing.deleteMany({});
    //adding owner
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:'680591879bd4408bea565b52',

    }));
    await Listing.insertMany(initData.data);
    console.log("data was saved & initialized");
   
};
initDB();
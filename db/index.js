import mongoose from "mongoose";

const conectDB = async()=>{

    await mongoose.connect("mongodb+srv://prince1504:prince1504@cluster1.mqux0.mongodb.net/geo");
    console.log("database connected");

}

export {conectDB};
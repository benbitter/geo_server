import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        requires:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        requires:true,
    },
    email:{
        type:String,
        requires:true,
        unique:true,
        trim:true,
    },
    // profilePic:{
    //     type:String, // cloudinray link
    //     default:"" 
    // },
    token:{
        type:String
    }

},
{
    timestamps:true;
}
)

userSchema.pre("save",async function(next) {
    
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    return next();

})

userSchema.methods.generateToken = async function(){

    return await jwt.sign(
        {
            _id:this._id,
            userName:this.userName
        },
        "secret",
        {
            expiresIn:"1d"
        })
    
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}



export const User = mongoose.model("User",userSchema);
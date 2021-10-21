const mongoose = require("mongoose");
const uuid = require("uuid")
require("mongoose-double")(mongoose);
const userSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    accNo:{
        type:String,
        default:()=>{
            return uuid.v1();
        }
    },
    phone:{
        type:String,
        unique:true
    },
    balance:{
        type: mongoose.SchemaTypes.Double
    }
},{timestamps: true});



module.exports = mongoose.model("user",userSchema);

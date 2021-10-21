const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    amount:{
        type:Number
    }
},{timestamps: true});

module.exports = mongoose.model("transaction",transactionSchema);

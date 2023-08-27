const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    email : {
        type: String, 
        unique:true
    },
    password:{
        type: String, 
        required: true
    },
    plans:{
        type: String, 
        default: ""
    },
    approved:{
        type: Boolean, 
        default: false
    },
    status:{
        type: String, 
        default: "pending"
    },
    isAdmin:{
        type: Boolean, 
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);
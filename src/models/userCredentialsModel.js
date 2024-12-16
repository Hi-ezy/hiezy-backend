const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userCredentialsSchema = new Schema({
   
    username : {
      type: String,
      trim: true,
    },
    password : {
        type: String,
        trim: true
    },
    emailid: {
        type: String,
        trim: true,
      }
      
}, {timestamps:true});

module.exports = mongoose.model("credentials", userCredentialsSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidateDetailsSchema = new Schema({
    jobID: {
        type:String,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
        type: String,
        trim: true,
      },
      experience: {
        type: String,
        trim: true,
      },
      uniqueRandomCode : {
        type:String,
        trim:true
      }
      
}, {timestamps:true});

module.exports = mongoose.model("candidate_list", candidateDetailsSchema)
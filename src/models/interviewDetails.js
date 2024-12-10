const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const interviewDetailsSchema = new Schema({
    jobID: {
        type:String,
    },
    email: {
        type: String,
        trim: true,
      },
      sessionID: {
        type: String,
        trim: true,
      },
      uniqueRandomCode : {
        type:String,
        trim:true
      }
      
}, {timestamps:true});

module.exports = mongoose.model("interview_details", interviewDetailsSchema)
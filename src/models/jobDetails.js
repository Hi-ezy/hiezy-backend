const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = new Schema({
   
    jobID : {
      type: String,
      trim: true,
    },
    comapny: {
        type: String,
        trim: true,
      },
    jobTitle : {
        type: String,
        trim: true
    },
    skills: {
        type: Array,
        trim: true,
      },
      qualification : {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        trim: true,
      },
      location:{
      type: String,
      trim: true,
    },
      salary : {
        type: String,
        trim: true
    },
    jobDescription: {
        type: String,
        trim: true,
      },
      
}, {timestamps:true});

module.exports = mongoose.model("job_list", jobSchema)
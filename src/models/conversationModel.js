const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationsSchema = new Schema({
    sessionID: {
        type:String,
    },
    role: {
        type: String,
        enum: ["candidate", "AI"],
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      
}, {timestamps:true});

module.exports = mongoose.model("conversations_logs", conversationsSchema)
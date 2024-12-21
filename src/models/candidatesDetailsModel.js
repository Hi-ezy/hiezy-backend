const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidateDetailsSchema = new Schema({
    jobID: {
        type: String,
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
    uniqueRandomCode: {
        type: String,
        trim: true
    },
    resume_score: {
        type: Number,
        default: 0
    },
    candidate_status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interviewed', 'Hired','Rejected'],
        default: 'Applied'
    },
    date_of_application: {
        type: Date,
        default: Date.now
    },
    date_of_interview: {
        type: Date
    },
    interview_status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'No Show', 'Pending']
    }
}, {timestamps: true});

module.exports = mongoose.model("candidate_list", candidateDetailsSchema)
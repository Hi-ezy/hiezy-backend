const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewDetailsSchema = new Schema({
    cand_id: {
        type: String,
        required: true,
        trim: true
    },
    jobid: {
        type: String,
        required: true,
        trim: true
    },
    interview_score: {
        type: Number,
        default: 0
    },
    interview_matrix1_score: {
        type: Number,
        default: 0
    },
    interview_matrix2_score: {
        type: Number,
        default: 0
    },
    interview_matrix3_score: {
        type: Number,
        default: 0
    },
    interview_matrix4_score: {
        type: Number,
        default: 0
    },
    interview_matrix5_score: {
        type: Number,
        default: 0
    },
    interview_status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'No_show', 'Pending']
    },
    Candidate_relevency: {
        type: String,
        enum: ['High', 'Medium','Low'],
        default: 'Low'
    }
}, { timestamps: true });

module.exports = mongoose.model("interview_details", interviewDetailsSchema);

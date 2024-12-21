const InterviewDetails = require("../../models/interviewDetailsModel");

const saveInterviewScore = async (req, res) => {
    try {
        const data = req.body || {};
        
        // Create new interview details record
        const interviewScore = new InterviewDetails({
            cand_id: data.candidateId,
            jobid: data.jobId,
            interview_score: data.overallScore,
            interview_matrix1_score: data.matrix1Score,
            interview_matrix2_score: data.matrix2Score,
            interview_matrix3_score: data.matrix3Score,
            interview_matrix4_score: data.matrix4Score,
            interview_matrix5_score: data.matrix5Score,
            interview_status: 'completed',
            Candidate_relevency: data.relevancy
        });

        // Save the interview details
        const savedScore = await interviewScore.save();

        // Update candidate status in candidates collection
        await updateCandidateStatus(data.candidateId);

        res.status(200).json({
            success: true,
            code: 200,
            response: savedScore,
            message: "Interview score saved successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message || error.toString(),
            message: "Failed to save interview score"
        });
    }
};

const updateCandidateStatus = async (candidateId) => {
    try {
        // Reference to candidates model from:
        // src/models/candidatesDetails.js
        const CandidateDetails = require("../../models/candidatesDetailsModel");
        
        await CandidateDetails.findOneAndUpdate(
            { _id: candidateId },
            { 
                candidate_status: 'interviewed',
                interview_status: 'completed'
            }
        );
    } catch (error) {
        console.error("Error updating candidate status:", error);
        throw error;
    }
};

const getInterviewScore = async (req, res) => {
    try {
        const query = req.query || {};
        const score = await InterviewDetails.findOne({ cand_id: query.candidateId });
        
        if (!score) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Interview score not found"
            });
        }

        res.status(200).json({
            success: true,
            code: 200,
            response: score,
            message: "Interview score retrieved successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message || error.toString(),
            message: "Failed to retrieve interview score"
        });
    }
};

module.exports = {
    saveInterviewScore,
    getInterviewScore
};

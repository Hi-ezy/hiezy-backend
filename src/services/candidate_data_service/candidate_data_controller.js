const CandidateDetails = require("../../models/candidatesDetailsModel");

// Get all candidates with optional pagination
const getAllCandidates = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const candidates = await CandidateDetails.find({})
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.status(200).json({
            success: true,
            code: 200,
            response: candidates,
            message: "Candidates fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message,
            message: "Failed to fetch candidates"
        });
    }
};

// Get candidates by jobID
const getCandidatesByJobId = async (req, res) => {
    try {
        const { jobID } = req.query;
        const candidates = await CandidateDetails.find({ jobID });

        res.status(200).json({
            success: true,
            code: 200,
            response: candidates,
            message: "Candidates fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message,
            message: "Failed to fetch candidates"
        });
    }
};

// Get candidate by ID
const getCandidateById = async (req, res) => {
    try {
        const { id } = req.query;
        const candidate = await CandidateDetails.findById(id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Candidate not found"
            });
        }

        res.status(200).json({
            success: true,
            code: 200,
            response: candidate,
            message: "Candidate fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message,
            message: "Failed to fetch candidate"
        });
    }
};

// Get candidates by status (candidate_status or interview_status)
const getCandidatesByStatus = async (req, res) => {
    try {
        const { candidate_status, interview_status } = req.query;
        const query = {};

        if (candidate_status) {
            query.candidate_status = candidate_status;
        }
        if (interview_status) {
            query.interview_status = interview_status;
        }

        const candidates = await CandidateDetails.find(query);

        res.status(200).json({
            success: true,
            code: 200,
            response: candidates,
            message: "Candidates fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            error: error.message,
            message: "Failed to fetch candidates"
        });
    }
};

module.exports = {
    getAllCandidates,
    getCandidatesByJobId,
    getCandidateById,
    getCandidatesByStatus
};

const router = require("express").Router();
const {
    getAllCandidates,
    getCandidatesByJobId,
    getCandidateById,
    getCandidatesByStatus
} = require("./candidate_data_controller");

router.get("/all", getAllCandidates);
router.get("/byjob", getCandidatesByJobId);
router.get("/byid", getCandidateById);
router.get("/bystatus", getCandidatesByStatus);

module.exports = router;

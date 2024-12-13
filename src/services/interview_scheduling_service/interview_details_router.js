const router = require("express").Router();
const {createInterviewDetail, validateCandidate} =require("./interview_schedule_controller");

router.post("/sendemail", createInterviewDetail);

router.get("/validatecandidate", validateCandidate);
module.exports = router;
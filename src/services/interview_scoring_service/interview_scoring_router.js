const router = require("express").Router();
const { saveInterviewScore, getInterviewScore } = require("./interview_scoring_controller");

router.post("/savescore", saveInterviewScore);
router.get("/getscore", getInterviewScore);

module.exports = router;

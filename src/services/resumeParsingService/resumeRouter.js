const router = require("express").Router();
const resume = require("./resumeControlle");

router.post("/upload-resume", resume.upload.single("resume"), resume.uploadResume);
// router.post("/createjob", ai.jdCreator);
module.exports = router;
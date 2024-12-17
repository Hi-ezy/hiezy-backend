const router = require("express").Router();
const job = require("./job_controller");

router.post("/create-job", job.jdCreator);
router.post("/create-jd", job.createAIJD);
router.get("/getalljobs", job.getAllJob);
router.get("/getjobbycompany", job.getAllJobBYCompany);
// router.post("/createjob", ai.jdCreator);
module.exports = router;
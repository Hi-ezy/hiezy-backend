const router = require("express").Router();
const {createInterviewDetail} =require("./interview_schedule_controller");

router.post("/create-interview", createInterviewDetail);
module.exports = router;
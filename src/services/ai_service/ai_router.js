const router = require("express").Router();
const ai = require("./ai_controller");

router.post("/question", ai.aiResponseGenrator);
// router.post("/createjob", ai.jdCreator);
module.exports = router;
const router = require("express").Router();
const ai = require("./ai_controller");

router.post("/question", ai.aiResponseGenrator);
module.exports = router;
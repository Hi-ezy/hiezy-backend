const router = require("express").Router();
const {login, signup} =require("./authentication_controller");

router.post("/login", login);

router.post("/signup", signup);
module.exports = router;
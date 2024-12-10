require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const app = express();

// Routing components
const aibotrouter = require("./src/services/ai_service/ai_router")
const interviewRouter = require("./src/services/interview_scheduling_service/interview_details_router")
//databse connection
mongoose.connect("mongodb://localhost:27017/hiezy");

mongoose.connection.once("open", () => {
  console.log("connected with database..");
});

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//routing
app.use("/app/ai",  aibotrouter)
app.use("/app/interview",  interviewRouter)
//listning
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
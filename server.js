require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const app = express();

// Routing components
const interviewRoute = require("./ai_service/ai_router")

//databse connection
mongoose.connect("mongodb://localhost:27017/hiezy");

mongoose.connection.once("open", () => {
  console.log("connected with database..");
});

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//routing
app.use("/app/interview",  interviewRoute)
//listning
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
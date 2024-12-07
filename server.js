require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const app = express();


//databse connection
mongoose.connect("mongodb://localhost:27017/hiezy");

mongoose.connection.once("open", () => {
  console.log("connected with database..");
});

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//routing

//listning
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
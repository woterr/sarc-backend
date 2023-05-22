const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
// const { sendEmbed } = require("./requestDiscord");
const { projectUpload } = require("./project.js");
const projectModel = require("./Schemas/project.js");
require("dotenv").config();

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());

// Mongo connection
mongoose
  .connect(process.env.MONGO_TOKEN)
  .then(() => console.log("Connected to mongodb"));

// routes

app.post("/contact", (req, res) => {
  sendEmbed(req.body);
});
app.post("/projects", (req, res) => {
  if (
    req.body.password === process.env.PASSWORD &&
    req.body.user === process.env.USER
  ) {
    projectUpload(req.body);
  } else {
    return;
  }
});

app.get("/designs", (req, res) => {
  res.send("Deisgns api for woter");
});

app.get("/projects", (req, res) => {
  projectModel.find({}, function (err, resPost) {
    // console.log(resPost);
    res.send(resPost);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = mongoose;
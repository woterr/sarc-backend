const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const cors = require("cors");
const { sendEmbed } = require("./requestDiscord");
const projectModel = require("./Schemas/project.js");
require("dotenv").config();
const { encrypt } = require('n-krypta');

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());


// Mongo connection
mongoose
  .connect(process.env.MONGO_TOKEN)
  .then(() => console.log("Connected to mongodb"));

// token gener

const secret_key = "ewby739h2diuwiu"

// routes

app.post("/contact", (req, res) => {
  sendEmbed(req.body);
});

app.use('/login', (req, res) => {
  if(req.body.password === process.env.PASSWORD &&
    req.body.user === process.env.USER) {
    const token = encrypt(process.env.SECRET, secret_key)
    res.send({"token": token})
  }
});

app.get("/projects", (req, res) => {
  projectModel.find({}, function (err, resPost) {
    console.log(resPost);
    res.send(resPost);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = mongoose;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
// const { sendEmbed } = require("./requestDiscord");
const { projectUpload } = require("./project.js");
const projectModel = require("./Schemas/project.js");
require("dotenv").config();
const CryptoJS = require('crypto-js');

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());

const encryptWithAES = (text) => {
  const passphrase = process.env.PASSWORD;
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

// Mongo connection
mongoose
  .connect(process.env.MONGO_TOKEN)
  .then(() => console.log("Connected to mongodb"));

// token gener

function TokenGenerate() {
  const rand = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  return rand
}

// routes

app.post("/contact", (req, res) => {
  // sendEmbed(req.body);
});
app.post("/projects", (req, res) => {
    projectUpload(req.body);
  
});

app.use('/login', (req, res) => {
  if(req.body.password === process.env.PASSWORD &&
    req.body.user === process.env.USER) {
    const token = encryptWithAES(process.env.SECRET)
    res.send({"token": token})
  }
});
app.use("/delete", (req, res) => {
  const id = req.body.id
  projectModel.deleteOne({_id: id})
})

app.get("/designs", (req, res) => {
  res.send("Deisgns api for woter");
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

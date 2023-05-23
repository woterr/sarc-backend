const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
const { sendEmbed } = require("./requestDiscord");
const { projectUpload, projectDelete} = require("./project.js");
const projectModel = require("./Schemas/project.js");
require("dotenv").config();
const CryptoJS = require('crypto-js');

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());


// Mongo connection
mongoose
  .connect(process.env.MONGO_TOKEN)
  .then(() => console.log("Connected to mongodb"));

// token gener

function encrypt(text) {
  
  const base64data = Utilities.base64Encode(text, Utilities.Charset.UTF_8);
  return base64data;
}


// routes

app.post("/contact", (req, res) => {
  sendEmbed(req.body);
});

app.post("/projects", (req, res) => {
    projectUpload(req.body);
  
});

app.post("/delete", (req, res) => {
  projectDelete(req.body.id)
})

app.use('/login', (req, res) => {
  if(req.body.password === process.env.PASSWORD &&
    req.body.user === process.env.USER) {
    const token = encrypt(process.env.SECRET)
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

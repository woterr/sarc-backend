const { model, Schema } = require("mongoose");

module.exports = model(
  "sarc",
  new Schema({
    title: String,
    description: String,
    link: String,
  })
);

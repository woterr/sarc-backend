const { model, Schema } = require("mongoose");

module.exports = model(
  "sarc",
  new Schema({
    caption: String,
    image: String,
  })
);

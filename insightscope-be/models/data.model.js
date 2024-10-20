const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  day: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  A: {
    type: Number,
    require: true,
  },
  B: {
    type: Number,
    require: true,
  },
  C: {
    type: Number,
    require: true,
  },
  D: {
    type: Number,
    require: true,
  },
  E: {
    type: Number,
    require: true,
  },
  F: {
    type: Number,
    require: true,
  },
});

const Data = new mongoose.model("Data", dataSchema);

module.exports = Data;

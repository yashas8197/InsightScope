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
  a: {
    type: Number,
    require: true,
  },
  b: {
    type: Number,
    require: true,
  },
  c: {
    type: Number,
    require: true,
  },
  d: {
    type: Number,
    require: true,
  },
  e: {
    type: Number,
    require: true,
  },
  f: {
    type: Number,
    require: true,
  },
});

const Data = new mongoose.model("Data", dataSchema);

module.exports = Data;

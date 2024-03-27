const mongoose = require("mongoose");

const browserSchema = new mongoose.Schema({
  name: String, count: Number,
})

const deviceScehma = new mongoose.Schema({
  name: String, count: Number,
})
const UrlSchema = mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
  browsers: [browserSchema],
  devices: [deviceScehma]
});
module.exports = mongoose.model("url", UrlSchema);
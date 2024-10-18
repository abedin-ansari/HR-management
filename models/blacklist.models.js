const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const blackListTokenModel = mongoose.model("BlackListToken", blacklistSchema);

module.exports = { blackListTokenModel };

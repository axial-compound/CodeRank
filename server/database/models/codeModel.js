const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  codeBody: {
    type: String,
    required: true
  },
  codeLanguage: {
    type: String,
    required: true
  },
  submissionTime: {
    type: Date,
    default: Date.now()
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER" //reference to user model
  },
});

const CODE = new mongoose.model("CODE", codeSchema);

module.exports = CODE;

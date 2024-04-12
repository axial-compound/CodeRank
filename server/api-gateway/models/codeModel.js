const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  codeBodyURL: {
    type: String,
    required: true
  },
  codeLanguage: {
    type: String,
    required: true
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER" //reference to user model
  },
},
{ timestamps: true }
);

const CODE = new mongoose.model("CODE", codeSchema);

module.exports = CODE;

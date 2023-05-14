const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const UsersSchema = new Schema({
  phone: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String },
});
module.exports = UsersSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const reminderSchema = new Schema({
  name: String,
  date: String,
  time: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: Boolean,
  },
});

const reminderModel = mongoose.model("Reminder", reminderSchema);
module.exports = reminderModel;

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  codeforcesHandle: { type: String, required: true },
  currentRating: { type: Number, default: 0 },
  maxRating: { type: Number, default: 0 },
  lastSynced: { type: Date, default: null },
  remindersSent: { type: Number, default: 0 },
  remindersEnabled: { type: Boolean, default: true },
  cfData: {
    contests: { type: Array, default: [] },
    problems: { type: Array, default: [] },
  },
});

module.exports = mongoose.model("Student", studentSchema);

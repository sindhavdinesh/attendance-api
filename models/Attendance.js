const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty"
  },
  date: {
    type: String
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
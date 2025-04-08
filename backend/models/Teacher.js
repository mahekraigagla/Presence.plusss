const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  subjects: { type: [String], required: true },
  classesToday: { type: Number, default: 0 },
  nextClass: {
    name: { type: String },
    time: { type: String },
    location: { type: String },
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);

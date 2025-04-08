const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new teacher
router.post('/', async (req, res) => {
  const teacher = new Teacher(req.body);
  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const fetchCFData = require("../utils/cfFetcher");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student by ID (full student data)
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student Codeforces profile data by ID
router.get("/:id/profile", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student.cfData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const cfData = await fetchCFData(req.body.codeforcesHandle);
    student.cfData = cfData;
    student.currentRating = cfData.currentRating;
    student.maxRating = cfData.maxRating;
    student.lastSynced = new Date();
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update Codeforces handle (and re-fetch data)
router.put("/:id/handle", async (req, res) => {
  try {
    const { codeforcesHandle } = req.body;
    const cfData = await fetchCFData(codeforcesHandle);
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        codeforcesHandle,
        cfData,
        currentRating: cfData.currentRating,
        maxRating: cfData.maxRating,
        lastSynced: new Date(),
      },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

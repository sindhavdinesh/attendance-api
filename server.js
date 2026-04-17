const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Faculty = require("./models/Faculty");
const Attendance = require("./models/Attendance");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* Register Faculty (Optional but useful) */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const faculty = new Faculty({
    name,
    email,
    password: hashedPassword
  });

  await faculty.save();
  res.json({ msg: "Faculty Registered" });
});

/* Login API */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const faculty = await Faculty.findOne({ email });
  if (!faculty) return res.status(400).json({ msg: "Invalid email" });

  const isMatch = await bcrypt.compare(password, faculty.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: faculty._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* Mark Attendance */
app.post("/attendance", auth, async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const attendance = new Attendance({
    facultyId: req.faculty.id,
    date: today,
    status: "Present"
  });

  await attendance.save();
  res.json({ msg: "Attendance Marked" });
});

/* Get Today Attendance */
app.get("/attendance/today", auth, async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const data = await Attendance.find({ date: today })
    .populate("facultyId", "name email");

  res.json(data);
});

/* Get Attendance By Date */
app.get("/attendance/:date", auth, async (req, res) => {
  const data = await Attendance.find({ date: req.params.date })
    .populate("facultyId", "name email");

  res.json(data);
});

/* Server Start */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
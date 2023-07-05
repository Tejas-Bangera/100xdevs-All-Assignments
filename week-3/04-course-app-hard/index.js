const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const secretKey = "my-secret-key";

// Define mongoose schemas
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose models
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

mongoose.connect(
  "mongodb+srv://tejas-bangera:Mongodbpassw0rd@cluster0.duuaega.mongodb.net/CourseWebsiteDB"
);

/**
 * __Function to generate JWT token that expires in 1hr__
 * @param {*} user
 * @returns `token`
 */
function generateJWT(user) {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
}

// Admin routes
// Admin Sign up
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    // If admin already exists
    if (admin)
      return res
        .status(403)
        .json({ message: `Admin ${username} already exists` });

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    // Generate JWT Token
    const token = generateJWT({ username, role: "admin" });
    res.json({ message: "Admin created successfully", token });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * __Function to validate login credentials of an Admin__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
async function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;

  try {
    const admin = await Admin.findOne({ username, password });
    // If admin is not valid
    if (!admin)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = admin;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * __Function to validate login credentials of an User__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
async function userAuthentication(req, res, next) {
  const { username, password } = req.headers;

  try {
    const user = await User.findOne({ username, password });
    // If user is not valid
    if (!user)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(err);
  }
}

// Admin Login
app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin

  // Generate JWT Token
  const token = generateJWT({ username: req.user.username, role: "admin" });

  res.json({ message: "Logged in successfully", token });
});

/**
 * __Middleware function to handle JWT verification__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 */
function validateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

// Admin create course
app.post("/admin/courses", validateJWT, async (req, res) => {
  const newCourse = new Course(req.body);

  try {
    await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      courseId: newCourse.id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin update course
app.put("/admin/courses/:courseId", validateJWT, async (req, res) => {
  // logic to edit a course

  const courseId = req.params.courseId;

  try {
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    // If course not found
    if (!course)
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found!` });

    res.json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin get all courses
app.get("/admin/courses", validateJWT, async (req, res) => {
  // logic to get all courses
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User routes
// User Sign up
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // If user already exists
    if (user) return res.status(403).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateJWT({ username, role: "user" });
    res.json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User Login
app.post("/users/login", userAuthentication, async (req, res) => {
  // logic to log in user
  const token = generateJWT({ username: req.user.username, role: "user" });

  res.json({ message: "Logged in successfully", token });
});

// User get all courses
app.get("/users/courses", validateJWT, async (req, res) => {
  // logic to list all courses
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User purchase a course
app.post("/users/courses/:courseId", validateJWT, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    // If course not found
    if (!course)
      return res
        .status(403)
        .json({ message: `Course with id ${courseId} not found!` });

    // Check the user for which you want update the purchased course
    const user = await User.findOne({ username: req.user.username });
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    user.purchasedCourses.push(course);
    await user.save();

    res.json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User get all purchased courses
app.get("/users/purchasedCourses", validateJWT, async (req, res) => {
  // logic to view purchased courses
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    // If user not found
    if (!user) return res.status(403).json({ message: "User not found" });

    res.json({ purchasedCourses: user.purchasedCourses });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

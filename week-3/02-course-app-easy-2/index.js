const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let courseId = 1;

const secretKey = "my-secret-key";

/**
 * __Function to generate JWT token that expires in 1hr__
 * @param {*} user
 * @returns `token`
 */
function generateJWT(user) {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
}

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  let newAdmin = {
    username: req.body.username,
    password: req.body.password,
  };

  ADMINS.push(newAdmin);

  // Generate JWT Token
  const token = generateJWT(newAdmin);

  res.json({ message: "Admin created successfully", token });
  // res.status(201).json(newAdmin);
});

/**
 * __Function to validate login credentials of an Admin/User__
 * @param {*} req
 * @param {*} arr
 * @returns `true` if login credentials are valid else `false`
 */
function validateLogin(req, arr) {
  const { username, password } = req.headers;
  // Validate login credentials
  const user = arr.find((user) => user.username === username);

  if (!user || user.password !== password) return;

  return user;
}

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  const user = validateLogin(req, ADMINS);

  if (!user)
    return res.status(401).json({ message: "Invalid login credentials" });

  // Generate JWT Token
  const token = generateJWT(user);

  res.json({ message: "Logged in successfully", token });
});

/**
 * __Middleware function to handle JWT verification__
 * @param {*} req
 * @param {*} res
 * @param {*} next
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

app.post("/admin/courses", validateJWT, (req, res) => {
  // logic to create a course

  const { title, description, price, imageLink, published } = req.body;
  const newCourse = {
    id: courseId++,
    title,
    description,
    price,
    imageLink,
    published,
  };

  COURSES.push(newCourse);
  res.status(201).json({
    message: "Course created successfully",
    courseId: newCourse.id,
    // user: req.user,
  });
});

app.put("/admin/courses/:courseId", validateJWT, (req, res) => {
  // logic to edit a course

  const id = Number(req.params.courseId);

  const courseIndex = COURSES.findIndex((course) => course.id === id);

  if (courseIndex === -1)
    return res.status(404).json({ message: `Course with id ${id} not found!` });

  const course = COURSES[courseIndex];
  const updatedCourse = {
    ...course,
    ...req.body,
  };

  COURSES[courseIndex] = updatedCourse;

  res.json({ message: "Course updated successfully" });
});

app.get("/admin/courses", validateJWT, (req, res) => {
  // logic to get all courses

  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: [],
  };

  USERS.push(newUser);

  const token = generateJWT(newUser);

  res.json({ message: "User created successfully", token });
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  if (!validateLogin(req, USERS))
    return res.status(401).json({ message: "Invalid login credentials" });

  const token = generateJWT(newUser);

  res.json({ message: "Logged in successfully", token });
});

app.get("/users/courses", validateJWT, (req, res) => {
  // logic to list all courses

  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", validateJWT, (req, res) => {
  // logic to purchase a course
  const user = USERS.find((user) => user.username === req.user.username);

  const id = Number(req.params.courseId);

  const courseIndex = COURSES.findIndex((course) => course.id === id);

  if (courseIndex === -1)
    return res.status(404).json({ message: `Course with id ${id} not found!` });

  user.purchasedCourses.push(id);
  res.json({ message: "Course purchased successfully" });
});

app.get("/users/purchasedCourses", validateJWT, (req, res) => {
  // logic to view purchased courses
  const user = USERS.find((user) => user.username === req.user.username);

  res.json({
    purchasedCourses: user.purchasedCourses.map((id) =>
      COURSES.find((course) => course.id === id)
    ),
  });
});

app.listen(3000, () => {
  console.log("https://localhost:3000");
});

const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let courseId = 1;

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  let newAdmin = {
    username: req.body.username,
    password: req.body.password,
  };

  ADMINS.push(newAdmin);

  res.json({ message: "Admin created successfully" });
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
  if (!validateLogin(req, ADMINS))
    return res.status(401).json({ message: "Invalid login credentials" });

  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", (req, res) => {
  // logic to create a course
  // Validate session login credentials
  if (!validateLogin(req, ADMINS))
    return res.status(401).json({ message: "Invalid login credentials" });

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
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: newCourse.id });
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
  // Validate session login credentials
  if (!validateLogin(req, ADMINS))
    return res.status(401).json({ message: "Invalid login credentials" });

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

app.get("/admin/courses", (req, res) => {
  // logic to get all courses
  // Validate session login credentials
  if (!validateLogin(req, ADMINS))
    return res.status(401).json({ message: "Invalid login credentials" });

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

  res.json({ message: "User created successfully" });
  // res.status(201).json(newAdmin);
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  if (!validateLogin(req, USERS))
    return res.status(401).json({ message: "Invalid login credentials" });

  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
  // Validate session login credentials
  if (!validateLogin(req, USERS))
    return res.status(401).json({ message: "Invalid login credentials" });

  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
  // Validate session login credentials
  const user = validateLogin(req, USERS);

  if (!user)
    return res.status(401).json({ message: "Invalid login credentials" });

  const id = Number(req.params.courseId);

  const courseIndex = COURSES.findIndex((course) => course.id === id);

  if (courseIndex === -1)
    return res.status(404).json({ message: `Course with id ${id} not found!` });

  user.purchasedCourses.push(id);
  res.json({ message: "Course purchased successfully" });
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
  // Validate session login credentials
  const user = validateLogin(req, USERS);

  if (!user)
    return res.status(401).json({ message: "Invalid login credentials" });

  res.json({
    purchasedCourses: user.purchasedCourses.map((id) =>
      COURSES.find((course) => course.id === id)
    ),
  });
});

app.listen(3000, () => {
  console.log("https://localhost:3000");
});

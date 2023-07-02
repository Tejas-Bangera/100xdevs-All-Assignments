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
 * __Function to validate login credentials of an Admin__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;
  // Validate login credentials
  const admin = ADMINS.find((admin) => admin.username === username);

  if (!admin || admin.password !== password)
    return res.status(401).json({ message: "Invalid login credentials" });

  next();
}

/**
 * __Function to validate login credentials of an User__
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Response status `401` if login credentials are invalid
 */
function userAuthentication(req, res, next) {
  const { username, password } = req.headers;
  // Validate login credentials
  const user = USERS.find((user) => user.username === username);

  if (!user || user.password !== password)
    return res.status(401).json({ message: "Invalid login credentials" });

  req.user = user;
  next();
}

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
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
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: newCourse.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course

  const id = Number(req.params.courseId);

  const courseIndex = COURSES.findIndex((course) => course.id === id);

  if (courseIndex === -1)
    return res.status(404).json({ message: `Course with id ${id} not found!` });

  Object.assign(COURSES[courseIndex], req.body);
  // const course = COURSES[courseIndex];
  // const updatedCourse = {
  //   ...course,
  //   ...req.body,
  // };

  // COURSES[courseIndex] = updatedCourse;

  res.json({ message: "Course updated successfully" });
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
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

  res.json({ message: "User created successfully" });
  // res.status(201).json(newAdmin);
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  // logic to purchase a course
  // Validate session login credentials
  const user = req.user;

  const id = Number(req.params.courseId);

  const courseIndex = COURSES.findIndex((course) => course.id === id);

  if (courseIndex === -1)
    return res.status(404).json({ message: `Course with id ${id} not found!` });

  user.purchasedCourses.push(id);
  res.json({ message: "Course purchased successfully" });
});

app.get("/users/purchasedCourses", userAuthentication, (req, res) => {
  // logic to view purchased courses
  const user = req.user;

  res.json({
    purchasedCourses: user.purchasedCourses.map((id) =>
      COURSES.find((course) => course.id === id)
    ),
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

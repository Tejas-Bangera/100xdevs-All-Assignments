const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

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
// Admin Sign up
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  let newAdmin = {
    username: req.body.username,
    password: req.body.password,
  };

  // Read and update new admin in the file
  fs.readFile("./files/admin.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    const admins = JSON.parse(data).admins;
    admins.push(newAdmin);

    fs.writeFile("./files/admin.db.json", JSON.stringify({ admins }), (err) => {
      if (err) return res.status(500).send(err);

      // Generate JWT Token
      const token = generateJWT(newAdmin);

      res.json({ message: "Admin created successfully", token });
    });
  });
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
  fs.readFile("./files/admin.db.json", "utf-8", (err, data) => {
    if (err) return res.sendStatus(500);

    const admins = JSON.parse(data).admins;
    const admin = admins.find((admin) => admin.username === username);

    if (!admin || admin.password !== password)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = admin;
    next();
  });
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
  fs.readFile("./files/user.db.json", "utf-8", (err, data) => {
    if (err) return res.sendStatus(500);

    const users = JSON.parse(data).users;
    const user = users.find((user) => user.username === username);

    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid login credentials" });

    req.user = user;
    next();
  });
}

// Admin Login
app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin

  // Generate JWT Token
  const token = generateJWT(req.user);

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

// Admin validate jwt
app.get("/admin/validatejwt", validateJWT, (req, res) => {
  res.json({ message: "JWT Validated!", username: req.user.username });
});

// Admin create course
app.post("/admin/courses", validateJWT, (req, res) => {
  // logic to create a course
  fs.readFile("./files/course.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    let { id: courseId, courses } = JSON.parse(data);
    const { title, description, price, imageLink, published } = req.body;
    const newCourse = {
      id: courseId++,
      title,
      description,
      price,
      imageLink,
      published,
    };

    courses.push(newCourse);

    fs.writeFile(
      "./files/course.db.json",
      JSON.stringify({ id: courseId, courses }),
      (err) => {
        if (err) return res.status(500).send(err);

        res.status(201).json({
          message: "Course created successfully",
          courseId: newCourse.id,
          // user: req.user,
        });
      }
    );
  });
});

// Admin update course
app.put("/admin/courses/:courseId", validateJWT, (req, res) => {
  // logic to edit a course

  const courseId = Number(req.params.courseId);

  fs.readFile("./files/course.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    const { id, courses } = JSON.parse(data);
    const courseIndex = courses.findIndex((course) => course.id === courseId);

    if (courseIndex === -1)
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} not found!` });

    Object.assign(courses[courseIndex], req.body);
    // const course = courses[courseIndex];
    // const updatedCourse = {
    //   ...course,
    //   ...req.body,
    // };

    // courses[courseIndex] = updatedCourse;

    fs.writeFile(
      "./files/course.db.json",
      JSON.stringify({ id, courses }),
      (err) => {
        if (err) return res.status(500).send(err);

        res.json({ message: "Course updated successfully" });
      }
    );
  });
});

// Admin get all courses
app.get("/admin/courses", validateJWT, (req, res) => {
  // logic to get all courses

  fs.readFile("./files/course.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    const courses = JSON.parse(data).courses;

    res.json({ courses });
  });
});

// User routes
// User Sign up
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: [],
  };

  fs.readFile("./files/user.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    const users = JSON.parse(data).users;
    users.push(newUser);

    fs.writeFile("./files/user.db.json", JSON.stringify({ users }), (err) => {
      if (err) return res.status(500).send(err);

      const token = generateJWT(newUser);
      res.json({ message: "User created successfully", token });
    });
  });
});

// User Login
app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  const token = generateJWT(req.user);

  res.json({ message: "Logged in successfully", token });
});

// User get all courses
app.get("/users/courses", validateJWT, (req, res) => {
  // logic to list all courses

  fs.readFile("./files/course.db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);

    const courses = JSON.parse(data).courses;

    res.json({ courses: courses.filter((course) => course.published) });
  });
});

// User purchase a course
app.post("/users/courses/:courseId", validateJWT, (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId);

  fs.readFile("./files/user.db.json", "utf-8", (err, userData) => {
    if (err) return res.status(500).send(err);

    const users = JSON.parse(userData).users;
    const userIndex = users.findIndex(
      (user) => user.username === req.user.username
    );

    fs.readFile("./files/course.db.json", "utf-8", (err, courseData) => {
      if (err) return res.status(500).send(err);

      const courses = JSON.parse(courseData).courses;
      const courseIndex = courses.findIndex(
        (course) => course.id === courseId && course.published
      );

      if (courseIndex === -1)
        return res
          .status(404)
          .json({ message: `Course with id ${courseId} not found!` });

      users[userIndex].purchasedCourses.push(courseId);

      fs.writeFile("./files/user.db.json", JSON.stringify({ users }), (err) => {
        if (err) return res.status(500).send(err);

        res.json({ message: "Course purchased successfully" });
      });
    });
  });
});

// User get all purchased courses
app.get("/users/purchasedCourses", validateJWT, (req, res) => {
  // logic to view purchased courses

  fs.readFile("./files/user.db.json", "utf-8", (err, userData) => {
    if (err) return res.status(500).send(err);

    const users = JSON.parse(userData).users;
    const user = users.find((user) => user.username === req.user.username);

    fs.readFile("./files/course.db.json", "utf-8", (err, courseData) => {
      if (err) return res.status(500).send(err);

      const courses = JSON.parse(courseData).courses;
      res.json({
        purchasedCourses: user.purchasedCourses.map((id) =>
          courses.find((course) => course.id === id)
        ),
      });
    });
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

// Import
import express from "express";

// Create express app and define port
const app = express();
const port = 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes

// Welcome Page
app.get("/", (req, res) => {
  res.render("welcome");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

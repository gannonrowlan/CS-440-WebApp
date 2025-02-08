// Import
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Dummy database
let users = [];
let books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    genre: "Fiction",
    available: true,
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
    genre: "Non-fiction",
    available: true,
  },
];
let borrowedBooks = [];

// Welcome Page
app.get("/", (req, res) => {
  res.render("welcome");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.redirect("/dashboard");
    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    console.log("User Registered:", result);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating account");
  }
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { books, borrowedBooks });
});

// Borrow a book
app.post("/borrow/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book && book.available) {
    book.available = false;
    borrowedBooks.push(book);
    res.redirect("/dashboard");
  } else {
    res.status(400).send("Book is not available");
  }
});

// Return a book
app.post("/return/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = borrowedBooks.find((b) => b.id === bookId);
  if (book) {
    book.available = true;
    borrowedBooks = borrowedBooks.filter((b) => b.id !== bookId);
    res.redirect("/dashboard");
  } else {
    res.status(400).send("Book not found in borrowed list");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import
import express from "express";
import bodyParser from "body-parser";
import path from "path";

// Create express app and define port
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.redirect("/dashboard");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    users.push({ email, password });
    res.redirect("/dashboard");
  } else {
    res.status(400).send("Please enter both email and password");
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

// Import dependencies
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import pool from "./db.js";
import dotenv from "dotenv";
import session from "express-session";
import booksRoutes from "./book_service/books.js";
import authenticator from "./authentication_services/authentication.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "librarySecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/books", booksRoutes);

// Authentication Middleware
/*const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};*/

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
    if (users.length === 0) return res.status(400).send("User not found");
    const user = users[0];
    if (await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      req.session.username = user.username;
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
app.get("/dashboard", authenticator.requireLogin, async (req, res) => {
  try {
    const [books] = await pool.query(
      "SELECT * FROM books ORDER BY RAND() LIMIT 5"
    );

    let [borrowedBooks] = await pool.query(
      "SELECT b.id, b.title, b.author, bb.due_date FROM borrowed_books bb JOIN books b ON bb.book_id = b.id WHERE bb.user_id = ?",
      [req.session.userId]
    );

    borrowedBooks = borrowedBooks.map((book) => ({
      ...book,
      due_date: new Date(book.due_date).toDateString(), // "Sun Mar 02 2025"
    }));

    res.render("dashboard", {
      username: req.session.username,
      books,
      borrowedBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
});

// Borrow a book
/*app.post("/borrow/:id", requireLogin, async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const [existing] = await pool.query(
      "SELECT * FROM borrowed_books WHERE book_id = ? AND user_id = ?",
      [bookId, req.session.userId]
    );
    if (existing.length > 0) {
      return res.status(400).send("You have already borrowed this book");
    }
    const [book] = await pool.query(
      "SELECT available FROM books WHERE id = ?",
      [bookId]
    );
    if (book.length === 0 || book[0].available <= 0) {
      return res.status(400).send("Book is not available");
    }
    await pool.query(
      "UPDATE books SET available = available - 1 WHERE id = ?",
      [bookId]
    );
    await pool.query(
      "INSERT INTO borrowed_books (user_id, book_id, due_date) VALUES (?, ?, ?)",
      [
        req.session.userId,
        bookId,
        new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      ]
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error borrowing book");
  }
});*/

// Return a book
/*app.post("/return/:id", requireLogin, async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const [borrowed] = await pool.query(
      "SELECT * FROM borrowed_books WHERE book_id = ? AND user_id = ?",
      [bookId, req.session.userId]
    );
    if (borrowed.length === 0) {
      return res.status(400).send("Book not found in borrowed list");
    }
    await pool.query(
      "DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?",
      [bookId, req.session.userId]
    );
    await pool.query(
      "UPDATE books SET available = available + 1 WHERE id = ?",
      [bookId]
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error returning book");
  }
});*/

// Search books
app.get("/search", authenticator.requireLogin, async (req, res) => {
  const { query } = req.query;
  try {
    const [filteredBooks] = await pool.query(
      "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR genre LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(filteredBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching books");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

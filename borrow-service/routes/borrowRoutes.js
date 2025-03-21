import express from "express";
import pool from "../db.js";

const router = express.Router();

// Dashboard Page
router.get("/dashboard", async (req, res) => {
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
      due_date: new Date(book.due_date).toDateString(),
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
router.post("/borrow/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const [existing] = await pool.query(
      "SELECT * FROM borrowed_books WHERE book_id = ? AND user_id = ?",
      [bookId, req.session.userId]
    );
    if (existing.length > 0) {
      return res.status(400).send("You have already borrowed this book");
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
    res.redirect("/books/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error borrowing book");
  }
});

// Return a book
router.post("/return/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    await pool.query(
      "DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?",
      [bookId, req.session.userId]
    );
    await pool.query(
      "UPDATE books SET available = available + 1 WHERE id = ?",
      [bookId]
    );
    res.redirect("/books/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error returning book");
  }
});

export default router;

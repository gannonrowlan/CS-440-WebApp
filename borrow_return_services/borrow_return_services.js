// Import dependencies
import pool from "./db.js";
import booksRoutes from "../book_service/books.js";
import authenticator from "../authentication_services/authentication.js"

BOOK_SERVICE_URL = 'http://book-service:5001/api/books'

// Borrow a book
app.post("/borrow/:id", authenticator.requireLogin, async (req, res) => {
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
  });
  
  // Return a book
  app.post("/return/:id", authenticator.requireLogin, async (req, res) => {
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
  });
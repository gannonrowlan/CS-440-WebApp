import express from "express";
import pool from "../db.js";

import express from "express";
import pool from "./db.js";

const router = express.Router();

// Fetch 5 random books
booksRoutes.get("/random", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM Books ORDER BY RAND() LIMIT 5"
    );
    res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
});

// Search for books
booksRoutes.get("/search", async (req, res) => {
  const query = req.query.query;
  try {
    const [results] = await pool.query(
      "SELECT * FROM Books WHERE title LIKE ? OR author LIKE ? OR genre LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
});

// Fetch all books in alphabetical order
booksRoutes.get("/all", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM Books ORDER BY title ASC"
    );
    res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
});

// Render Manage Books Page (for Admin)
booksRoutes.get("/manage-books", async (req, res) => {
  try {
    const [books] = await pool.query("SELECT * FROM Books ORDER BY title ASC");
    res.render("manage-books", { books });
  } catch (err) {
    res.status(500).send("Error loading books");
  }
});

// Add a new book
booksRoutes.post("/add", async (req, res) => {
  const { title, author, genre, available } = req.body;
  try {
    await pool.query(
      "INSERT INTO Books (title, author, genre, available) VALUES (?, ?, ?, ?)",
      [title, author, genre, available]
    );
    res.redirect("/books/manage-books");
  } catch (err) {
    return res.status(500).json({ error: "Error adding book" });
  }
});

// Update available copies of a book
booksRoutes.post("/update/:id", async (req, res) => {
  const bookId = req.params.id;
  const { available } = req.body;
  try {
    await pool.query("UPDATE Books SET available = ? WHERE id = ?", [
      available,
      bookId,
    ]);
    res.redirect("/books/manage-books");
  } catch (err) {
    return res.status(500).json({ error: "Error updating book availability" });
  }
});

// Delete a book
booksRoutes.post("/delete/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await pool.query("DELETE FROM Books WHERE id = ?", [bookId]);
    res.redirect("/books/manage-books");
  } catch (err) {
    return res.status(500).json({ error: "Error deleting book" });
  }
});

export default router;

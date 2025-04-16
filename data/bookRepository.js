import pool from "../db.js";

// Get 5 random books
export const getRandomBooks = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM books ORDER BY RAND() LIMIT 5"
  );
  return rows;
};

// Get books borrowed by a user
export const getBorrowedBooksByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT b.id, b.title, b.author, bb.due_date
     FROM borrowed_books bb
     JOIN books b ON bb.book_id = b.id
     WHERE bb.user_id = ?`,
    [userId]
  );
  return rows;
};

// Check if user already borrowed a book
export const checkAlreadyBorrowed = async (userId, bookId) => {
  const [rows] = await pool.query(
    "SELECT * FROM borrowed_books WHERE book_id = ? AND user_id = ?",
    [bookId, userId]
  );
  return rows.length > 0;
};

// Get availability count for a book
export const getBookAvailability = async (bookId) => {
  const [rows] = await pool.query("SELECT available FROM books WHERE id = ?", [
    bookId,
  ]);
  return rows.length > 0 ? rows[0].available : 0;
};

// Decrease available count
export const decreaseBookAvailability = async (bookId) => {
  await pool.query("UPDATE books SET available = available - 1 WHERE id = ?", [
    bookId,
  ]);
};

// Increase available count
export const increaseBookAvailability = async (bookId) => {
  await pool.query("UPDATE books SET available = available + 1 WHERE id = ?", [
    bookId,
  ]);
};

// Insert borrow record
export const insertBorrowRecord = async (userId, bookId, dueDate) => {
  await pool.query(
    "INSERT INTO borrowed_books (user_id, book_id, due_date) VALUES (?, ?, ?)",
    [userId, bookId, dueDate]
  );
};

// Delete borrow record (return book)
export const deleteBorrowRecord = async (userId, bookId) => {
  await pool.query(
    "DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?",
    [bookId, userId]
  );
};

// Search books
export const searchBooks = async (query) => {
  const [rows] = await pool.query(
    `SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR genre LIKE ?`,
    [`%${query}%`, `%${query}%`, `%${query}%`]
  );
  return rows;
};

export const getAllBooksAlphabetical = async () => {
  const [rows] = await pool.query("SELECT * FROM books ORDER BY title ASC");
  return rows;
};

export const insertBook = async ({ title, author, genre, available }) => {
  await pool.query(
    "INSERT INTO books (title, author, genre, available) VALUES (?, ?, ?, ?)",
    [title, author, genre, available]
  );
};

export const deleteBook = async (bookId) => {
  await pool.query("DELETE FROM books WHERE id = ?", [bookId]);
};

export const updateBookAvailability = async (bookId, available) => {
  await pool.query("UPDATE books SET available = ? WHERE id = ?", [
    available,
    bookId,
  ]);
};

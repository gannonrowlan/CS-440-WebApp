import bookService from "../services/bookService.js";

// GET /dashboard
export const renderDashboard = async (req, res) => {
  try {
    const userId = req.session.userId;
    const username = req.session.username;

    const books = await bookService.getRandomBooks();
    const borrowedBooks = await bookService.getBorrowedBooks(userId);

    res.render("dashboard", {
      username,
      books,
      borrowedBooks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
};

// POST /borrow/:id
export const borrowBook = async (req, res) => {
  const userId = req.session.userId;
  const bookId = parseInt(req.params.id);

  try {
    await bookService.borrowBook(userId, bookId);
    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// POST /return/:id
export const returnBook = async (req, res) => {
  const userId = req.session.userId;
  const bookId = parseInt(req.params.id);

  try {
    await bookService.returnBook(userId, bookId);
    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// GET /search
export const searchBooks = async (req, res) => {
  const query = req.query.query;

  try {
    const books = await bookService.searchBooks(query);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching books");
  }
};

export const renderManageBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooksAlphabetical();
    res.render("manage-books", { books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading manage books page");
  }
};

export const addBook = async (req, res) => {
  const { title, author, genre, available } = req.body;

  try {
    await bookService.addBook({ title, author, genre, available });
    res.redirect("/books/manage-books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book");
  }
};

export const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    await bookService.deleteBook(bookId);
    res.redirect("/books/manage-books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting book");
  }
};

export const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { available } = req.body;

  try {
    await bookService.updateBookAvailability(bookId, available);
    res.redirect("/books/manage-books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating book availability");
  }
};

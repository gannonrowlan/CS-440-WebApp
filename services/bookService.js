import * as bookRepo from "../data/bookRepository.js";

const bookService = {
  getRandomBooks: async () => {
    return await bookRepo.getRandomBooks();
  },

  getBorrowedBooks: async (userId) => {
    const books = await bookRepo.getBorrowedBooksByUser(userId);
    return books.map((book) => ({
      ...book,
      due_date: new Date(book.due_date).toDateString(),
    }));
  },

  borrowBook: async (userId, bookId) => {
    const alreadyBorrowed = await bookRepo.checkAlreadyBorrowed(userId, bookId);
    if (alreadyBorrowed) {
      throw new Error("You have already borrowed this book");
    }

    const available = await bookRepo.getBookAvailability(bookId);
    if (available <= 0) {
      throw new Error("Book is not available");
    }

    await bookRepo.decreaseBookAvailability(bookId);

    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks
    await bookRepo.insertBorrowRecord(userId, bookId, dueDate);
  },

  returnBook: async (userId, bookId) => {
    const alreadyBorrowed = await bookRepo.checkAlreadyBorrowed(userId, bookId);
    if (!alreadyBorrowed) {
      throw new Error("Book not found in borrowed list");
    }

    await bookRepo.deleteBorrowRecord(userId, bookId);
    await bookRepo.increaseBookAvailability(bookId);
  },

  searchBooks: async (query) => {
    return await bookRepo.searchBooks(query);
  },

  getAllBooksAlphabetical: async () => {
    return await bookRepo.getAllBooksAlphabetical();
  },

  addBook: async (bookData) => {
    return await bookRepo.insertBook(bookData);
  },

  deleteBook: async (bookId) => {
    return await bookRepo.deleteBook(bookId);
  },

  updateBookAvailability: async (bookId, available) => {
    return await bookRepo.updateBookAvailability(bookId, available);
  },
};

export default bookService;

import express from "express";
import * as bookController from "../controllers/bookController.js";

// Optional middleware for protected routes
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

const router = express.Router();

router.get("/dashboard", requireLogin, bookController.renderDashboard);
router.post("/borrow/:id", requireLogin, bookController.borrowBook);
router.post("/return/:id", requireLogin, bookController.returnBook);
router.get("/search", requireLogin, bookController.searchBooks);
router.get(
  "/books/manage-books",
  requireLogin,
  bookController.renderManageBooks
);
router.post("/books/add", requireLogin, bookController.addBook);
router.post("/books/delete/:id", requireLogin, bookController.deleteBook);
router.post("/books/update/:id", requireLogin, bookController.updateBook);

export default router;

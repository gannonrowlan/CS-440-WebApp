import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Proxy Routes for Microservices
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || "http://auth-service:5000",
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);
app.use(
  "/borrow-service",
  createProxyMiddleware({
    target: process.env.BORROW_SERVICE_URL || "http://borrow-service:5001",
    changeOrigin: true,
    pathRewrite: { "^/borrow": "" },
  })
);
app.use(
  "/book-service",
  createProxyMiddleware({
    target: process.env.BOOK_SERVICE_URL || "http://book-service:5002",
    changeOrigin: true,
    pathRewrite: { "^/book": "" },
  })
);

// Default Route
app.get("/", (req, res) => {
  res.send("API Gateway is running...");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

// verify which service is calling it
// verify account exists function
    // return querey to database that account email is in database (true or false)
function verifyAccount(service)
{
    switch (service)
    {
        default:
            console.log("service not valid");
            break;
        case "borrow-service":
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ?"
                [req.session.userId]))
                res.redirect("/borrow/dashboard");
            break;
        case "book-service":
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ? AND email = ?",
                [req.session.userId, email]))
                res.redirect("/books/manage-books");
            break;
        case "auth-service":
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ? AND email = ?",
                [req.session.userId, email]))
                res.redirect("/auth/login");
            break;
    }
}
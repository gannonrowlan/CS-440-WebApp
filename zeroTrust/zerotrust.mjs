//import dotenv from "dotenv";
import express from "express";
import pool from "../db.js";

// verify which service is calling it
// verify account exists function
    // return querey to database that account email is in database (true or false)
export default verifyAccount;
const app = express();
function verifyAccount (service)
{
    switch (service)
    {
        default:
            console.log("service not valid");
            break;
        case "borrow-service":
            app.post("/borrow/:id", async(req, res) => {
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ?"
                [req.session.userId]))
                //res.redirect("/borrow/dashboard");
                res.redirect("books/manage-books");
            })
            break;
        case "book-service":
            (req, res) => {
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ? AND email = ?",
                [req.session.userId, email]))
                res.redirect("/books/manage-books");
            }
            break;
        case "auth-service":
            (req, res) => {
            if (pool.query(
                "SELECT * FROM Users WHERE user_id = ? AND email = ?",
                [req.session.userId, email]))
                res.redirect("/auth/login");
            }
            break;
    }
}
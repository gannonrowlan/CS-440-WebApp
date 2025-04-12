//import dotenv from "dotenv";
//import express from "express";
import pool from "../db.js";

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
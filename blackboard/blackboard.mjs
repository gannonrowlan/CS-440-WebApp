//import dotenv from "dotenv";
import express from "express";
import pool from "../db.js";
import MySQLEvents from "mysql-events";
import booksRoutes from "../books.js";
import fs from "fs";
import ejs from "ejs";
import path from "path"

const filePath = path.resolve("../views/dashboard.ejs");0
const newFilePath = path.resolve("../views/dashboard_new.ejs")
const ejsContent = fs.readFileSync(filePath, 'utf-8');
console.log(filePath);
//const ejsContent ;
const updateBook = {newText: "a new book has been added."}
const removeBook = {newText: "a book has been removed."}

//const constants = require("../app.cjs")
//console.log(constants.app)
//console.log(constants.port)
export default updateDashboard;

//const app = express()
function updateDashboard(action)
{
    switch (action)
    {
        case "add":
          // just write to dashboard that new book has been added for debugging
          booksRoutes.get("/dashboard", async (req, res) => {
             try {
                //res.json({text: "new book added."})
                dashboard = ejs.render(ejsContent, updateBook)
                fs.writeFileSync(newFilePath, dashboard);
                res.redirect("/dashboard_new");
                console.log("new book has been added")
             }

             catch(err) {
                return res.status(500).json({ error: "Error updating dashboard" });
             }
          })
          break;
        case "delete":
          // just write to dashboard that a book has been removed for debugging
          booksRoutes.get("/dashboard", async (req, res) => {
            try {
                //res.json({text: "a book has been removed."})
                const dashboard = ejs.render(ejsContent, removeBook)
                console.log("a book has been removed")
            }

            catch(err) {
               return res.status(500).json({ error: "Error updating dashboard" });
            }
          })
          break;
    }
}
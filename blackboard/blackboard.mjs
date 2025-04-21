//import dotenv from "dotenv";
import express from "express";
import pool from "../db.js";
import MySQLEvents from "mysql-events";
import booksRoutes from "../books.js";
import fs from "fs";
import ejs from "ejs";
import path from "path"
//import require from "require";

const filePath = path.resolve("../views/dashboard.ejs"); 
const ejsContent = fs.readFileSync(filePath, 'utf-8');

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
          booksRoutes.get("/new-text", async (req, res) => {
             try {
                //res.json({text: "new book added."})
                const dashboard = ejs.render(ejsContent, updateBook)
             }

             catch(err) {
                return res.status(500).json({ error: "Error updating dashboard" });
             }
          })
          console.log("new book has been added")

          break;
        case "delete":
          // just write to dashboard that a book has been removed for debugging
          booksRoutes.get("/new-text", async (req, res) => {
            try {
                //res.json({text: "a book has been removed."})
                const dashboard = ejs.render(ejsContent, removeBook)
            }

            catch(err) {
               return res.status(500).json({ error: "Error updating dashboard" });
            }
          })
          console.log("a book has been removed")
          break;
    }
}
//import dotenv from "dotenv";
import express from "express";
import pool from "../db.js";
import MySQLEvents from "mysql-events";

const constants = require("../app.cjs")
console.log(constants.app)
console.log(constants.port)
export default updateDashboard;
//const app = express()
function updateDashboard(action)
{
    switch (action)
    {
        case "add":
          // just write to dashboard that new book has been added for debugging
          console.log("new book has been added")
          break;
        case "delete":
          // just write to dashboard that a book has been removed for debugging
          console.log("a book has been removed")
          break;
    }
}
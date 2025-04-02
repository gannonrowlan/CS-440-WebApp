import dotenv from "dotenv";
import express from "express";
import pool from "./db.js";

// verify account exits function
    // return querey to database that account email is in database (true or false)
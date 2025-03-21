import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const port = process.env.AUTH_PORT || 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "librarySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth-service", authRoutes);

app.listen(port, () => {
  console.log(`Auth Service running on port ${port}`);
});

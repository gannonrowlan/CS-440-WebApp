import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from "express-session";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const app = express();
const port = process.env.BOOK_PORT || 5002;

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

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.redirect("/books/manage-books");
});

app.listen(port, () => {
  console.log(`Book Service running on port ${port}`);
});

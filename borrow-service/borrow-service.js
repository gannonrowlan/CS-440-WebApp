import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from "express-session";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();
const app = express();
const port = process.env.BORROW_PORT || 5001;

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

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("http://localhost:5000/auth/login");
  }
  next();
};

app.use("/borrow-service", requireLogin, borrowRoutes);

app.listen(port, () => {
  console.log(`Borrow Service running on port ${port}`);
});

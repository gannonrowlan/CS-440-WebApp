import bcrypt from "bcrypt";
import authService from "../services/authService.js";

// GET /login
export const renderLogin = (req, res) => {
  res.render("login");
};

// POST /login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.getUserByEmail(email);
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Incorrect password");

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

// GET /signup
export const renderSignup = (req, res) => {
  res.render("signup");
};

// POST /signup
export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    await authService.createUser(email, password);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating account");
  }
};

// GET /welcome
export const renderWelcome = (req, res) => {
  res.render("welcome");
};

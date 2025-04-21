//import dotenv from "dotenv";
import pool from "../db.js";

// verify which service is calling it
// verify account exists function
// return querey to database that account email is in database (true or false)
export default verifyAccount;
function verifyAccount(service) {
  return async function (req, res, next) {
    const userId = req.session?.userId;
    if (!userId) return res.status(401).send("Not authenticated");

    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      if (rows.length === 0) return res.status(403).send("User not found");

      const user = rows[0];

      if (service === "admin-service" && user.role !== "admin") {
        return res.status(403).send("Admin access only");
      }

      next();
    } catch (err) {
      console.error("Zero Trust check failed", err);
      return res.status(500).send("Zero Trust error");
    }
  };
}

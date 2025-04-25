import pool from "../db.js";

export default updateDashboard;

//const app = express()
function updateDashboard(maxID)
{
  //let maxID = 0;
  return async function (req, res, next) 
  {
    // just write to dashboard that new book has been added for debugging
    try {
      //const LAST_INSERT_ID = await pool.query("SELECT LAST_INSERT_ID();");
      const [rows] = await pool.query("select * from Books;")
      //const NEW_LAST_INSERT_ID = await pool.query("SELECT LAST_INSERT_ID();");
      
      if (rows.length === 0) return res.status(403).send("No new book added"); 

      for(let i = 0; i < rows.length; i++)
      {
        // assign higher id if index is higher than last
        id = i;
        if(id > maxID) maxID = id;
      }
      //return maxID;
      console.log("new max id: " + id);
      next();  // middleware might be left haning
    } catch(err) {
      return res.status(500).json({ error: "Blackboard error" });
    }    
  };
}
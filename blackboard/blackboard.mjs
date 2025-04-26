import pool from "../db.js";

export default countRows;

//const app = express()
async function countRows()
{
  let maxID = 0;
  const [rows] = await pool.query("select * from Books;");
  for(let i = 0; i < rows.length; i++) {
    // assign higher id if index is higher than last
    let id = i;
    if(id > maxID) maxID = id;
  }
  console.log("maxID is: " + maxID)
}
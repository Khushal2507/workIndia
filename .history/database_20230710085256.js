const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql
  .createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    database: "workindia",
  })
  .promise();

async function getAllEmployees() {
  const employee = await db.query("SELECT * FROM employees");
  console.log(employee[0][0]);
  return employee[0];
}

async function getEmployeeById(id) {
  const employee = await db.query("SELECT * FROM employees where id = ?", [id]);
  console.log(employee);
  return employee[0][0];
}
// console.log(getNoteById(1));

module.exports.db = db;
module.exports.getAllNotes = getAllNotes;
module.exports.getNoteById = getNoteById;

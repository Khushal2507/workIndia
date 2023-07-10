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

async function addUsers(name, email, password) {
  try {
    const user = await db.query(
      "INSERT INTO usersData(name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    const getUser = await db.query("SELECT * FROM usersData where id = ?", [
      user[0].insertId,
    ]);
    return getUser[0][0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getUserByEmail(email) {
  const user = await db.query("SELECT * FROM usersData where email = ?", [
    email,
  ]);
  return user;
}

async function getUserByID(id) {
  const user = await db.query("SELECT * FROM usersData where id = ?", [id]);
  return user;
}

async function getAllEmployees() {
  const employee = await db.query("SELECT * FROM usersData");
  console.log(employee[0][0]);
  return employee[0];
}

async function getEmployeeById(id) {
  const employee = await db.query("SELECT * FROM usersData where id = ?", [id]);
  console.log(employee);
  return employee[0][0];
}
// console.log(getNoteById(1));

module.exports.getUserByEmail = getUserByEmail;
module.exports.getAllEmployees = getAllEmployees;
module.exports.getEmployeeById = getEmployeeById;
module.exports.addUsers = addUsers;

const mysql = require("mysql2");

const db = mysql
  .createConnection({
    user: "root",
    password: "Naman@2003",
    host: "localhost",
    database: "workIndia",
  })
  .promise();

async function getAllNotes() {
  const notes = await db.query("SELECT * FROM Notes");
  console.log(notes[0]);
  return notes[0];
}

async function getNoteById(id) {
  const note = await db.query("SELECT * FROM Notes where note_id = ?", [id]);
  console.log(note[0][0]);
  return note[0][0];
}
// console.log(getNoteById(1));

module.exports.getAllNotes = getAllNotes;
module.exports.getNoteById = getNoteById;

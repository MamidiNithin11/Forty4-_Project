const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'users.db');

const db = new sqlite3.Database(dbPath, (err) => {
if (err) {
console.error('Could not connect to database', err);
} else {
console.log('Connected to SQLite database at', dbPath);
}
});

const createTableSql = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
phone TEXT,
role TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;


db.run(createTableSql, (err) => {
if (err) console.error('Failed to create users table', err.message);
});


module.exports = db;
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join('.', 'db', 'TodoDatabase.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą:', err.message);
  } else {
    console.log('Połączono z bazą SQLite:', dbPath);
  }
});

export default db;
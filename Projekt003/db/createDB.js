import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const dbFile = path.resolve('./db/TodoDatabase.db');
const dbExists = fs.existsSync(dbFile);

console.log(dbExists ? 'Plik bazy danych już istnieje.' : 'Tworzę nową bazę...');

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) return console.error(err.message);
  console.log('Połączono z bazą SQLite.');

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        messages TEXT NOT NULL,
        expiration_date DATE NOT NULL
      )
    `, (err) => {
      if (err) console.error(err.message);
      else console.log('Tabela "todo" została utworzona.');

      db.close(() => console.log('Połączenie z bazą zamknięte.'));
    });
  });
});
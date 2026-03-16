import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const dbFile = path.resolve(process.env.DB_PATH || "./db/TodoDatabase.db");
const dbExists = fs.existsSync(dbFile);

console.log(dbExists ? 'Plik bazy danych już istnieje.' : 'Tworzę nową bazę...');

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) return console.error(err.message);
  console.log('Połączono z bazą SQLite.');

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        messages TEXT NOT NULL,
        expirationDate DATE NOT NULL
      )
    `, (err) => {//id_user INTEGER NOT NULL,
      if (err) console.error(err.message);
      else console.log('Tabela "todo" została utworzona.')
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL,
      password TEXT NOT NULL,
      isAdmin BOOL NOT NULL DEFAULT 0
      )
      `, (err) => {
        if(err) console.error(err.message);
        else console.log('Tabela "users" została utworzona')
      });

    db.close(() => console.log('Połączenie z bazą zamknięte.'));
  });
});

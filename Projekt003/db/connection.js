import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('TodoDatabase.db', (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą:', err.message);
  } else {
    console.log('Połączono z bazą SQLite.');

    // Tworzymy tabelę, jeśli nie istnieje
    db.run(`CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      messages TEXT NOT NULL,
      expiration_date TEXT NOT NULL
    )`, (err) => {
      if (err) console.error('Błąd przy tworzeniu tabeli:', err.message);
    });
  }
});

export default db;
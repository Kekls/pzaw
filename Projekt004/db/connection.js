import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const dbFile = path.resolve('./db/TodoDatabase.db');


if (!fs.existsSync(dbFile)) {
  console.log('Plik bazy nie istnieje. Tworzę nową bazę...');
  execSync('node ./db/createDB.js', { stdio: 'inherit' }); // blokuje do momentu ukończenia createDB.js
}

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) console.error('Błąd połączenia z bazą:', err.message);
  else console.log('Połączono z bazą SQLite:', dbFile);
});

export default db;
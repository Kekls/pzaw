import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const dbFile = path.resolve(process.env.DB_PATH || "./db/TodoDatabase.db");


if (!fs.existsSync(dbFile)) {
  console.log('Plik bazy nie istnieje. Tworzę nową bazę...');
  execSync('node ./db/createDB.js', { stdio: 'inherit' }); // blokuje do momentu ukończenia createDB.js
}

let db;

try {
  db = new Database(dbFile);
  console.log("DB OK:", dbFile);
} catch (err) {
  console.error("DB FAIL:", err.message);
  process.exit(1);
}

export default db;
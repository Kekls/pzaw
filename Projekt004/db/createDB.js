import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbFile = path.resolve(process.env.DB_PATH || "./db/TodoDatabase.db");
const dbExists = fs.existsSync(dbFile);

console.log(dbExists ? 'Plik bazy danych już istnieje.' : 'Tworzę nową bazę...');

try{

  const db = new Database(dbFile);
  console.log('Połączono z bazą SQLite.');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      messages TEXT NOT NULL,
      expirationDate DATE NOT NULL
    )`).run();
  console.log('Tabela "todo" została utworzona.');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    isAdmin BOOL NOT NULL DEFAULT 0
    )`).run();
  console.log('Tabela "users" została utworzona');

  db.close();
  console.log("Połączenie z bazą zamknięte.");

}catch(err){
  console.error(err);
  process.exit(1);
}
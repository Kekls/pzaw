import db from './connection.js';
import readline from 'readline';
import argon2 from 'argon2';

const insertTestData = [
    ['test1', new Date().toLocaleString('pl-PL')],
    ['test2', new Date().toLocaleString('pl-PL')],
    ['test3', new Date().toLocaleString('pl-PL')],
    ['test4', new Date().toLocaleString('pl-PL')],
    ['test5', new Date().toLocaleString('pl-PL')]
];

try {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (text) =>
    new Promise(resolve => rl.question(text, resolve));

  const insertUser = db.prepare(
    'INSERT INTO users (login, password, isAdmin) VALUES (?, ?, ?)'
  );

  const insertTodo = db.prepare(
    'INSERT INTO todo (userId, messages, expirationDate) VALUES (?, ?, ?)'
  );

  const checkUser = db.prepare(
    'SELECT * FROM users WHERE login = ?'
  );

  for (let i = 0; i < 2; i++) {
    const login = await question('Podaj login: ');
    const password = await question('Podaj hasło: ');
    const hash = await argon2.hash(password);

    const loginUser = checkUser.get(login);

    if (password.length < 6){
      console.error('Hasło musi mieć min. 6 znaków');
      continue;
    }

    if (loginUser) {
      console.error('Użytkownik o takim loginie już istnieje!');
      continue;
    }

    const result = insertUser.run(login, hash, 0);
    const userId = result.lastInsertRowid;

    console.log(`Użytkownik ${login} utworzony pomyślnie!`);

    for (const [msg, date] of insertTestData) {
      const todoResult = insertTodo.run(userId, msg, date);
      console.log(`Dodano rekord ID: ${todoResult.lastInsertRowid}`);
    }
  }

  rl.close();

} catch (err) {
  console.error(err);
  rl.close();
  process.exit(1);
}
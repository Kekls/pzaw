import readline from 'readline';
import argon2 from 'argon2';
import db from './connection.js';

try{
    const user = db.prepare('SELECT * FROM users WHERE isAdmin = 1').get();

    if (user){
        console.error("Administrator już istnieje, użyj aplikacji do stworzenia kolejnego!");
        process.exit(0);
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (text) => new Promise(resolve => rl.question(text, resolve));
    
    const login = await question('Podaj login admina: ');
    const password = await question('Podaj hasło admina: ');
    const hash = await argon2.hash(password);

    const loginUser = db.prepare('SELECT * FROM users WHERE login = ?').get(login);

    if (loginUser){
        console.error('Użytkownik o takim loginie już istnieje!');
        rl.close();
        process.exit(0);
    }

    db.prepare('INSERT INTO users (login, password, isAdmin) VALUES (?, ?, ?)').run(login, hash, 1);
    console.log('Admin utworzony pomyślnie!');
    rl.close();
    process.exit(0);

}catch (err){
    console.error(err);
    process.exit(1);
}
import readline from 'readline';
import bcrypt from 'bcrypt';
import db from './connection.js';

db.get('SELECT * FROM users WHERE isAdmin = 1', async (err, row) => {
    if (err) console.error(err);
    if (row) {
        console.error("Administrator już istnieje, użyj aplikacji do stworzenia kolejnego!");
        process.exit();
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = (text) => new Promise(resolve => rl.question(text, resolve));
    
    const login = await question('Podaj login admina: ');
    const password = await question('Podaj hasło admina: ');
    const hashedPassword = await bcrypt.hash(password, 10);

    db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
        if (err) console.error(err);
        if (row) {
            console.log('Użytkownik o takim loginie już istnieje!');
            rl.close();
            process.exit();
        }
        db.run('INSERT INTO users (login, password, isAdmin) VALUES (?, ?, ?)',
            [login, hashedPassword, 1],
            (err) => {
                if (err) console.error(err);
                else console.log('Admin utworzony pomyślnie!');
                rl.close();
                process.exit();
            }
        );
    });
});
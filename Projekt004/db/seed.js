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

async function seedDatabase() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = (text) => new Promise(resolve => rl.question(text, resolve));

    for (let i = 0; i < 2; i++) {
        const login = await question('Podaj login: ');
        const password = await question('Podaj hasło: ');
        const hash = await argon2.hash(password);

        await new Promise((resolve, reject) => {
    db.run('INSERT INTO users (login, password, isAdmin) VALUES (?, ?, ?)',
        [login, hash, 0],
        function(err) {
            if (err) return reject(err);
            console.log('Użytkownik utworzony pomyślnie!');
            const userId = this.lastID;

            const inserts = insertTestData.map(([msg, date]) => 
                new Promise((res, rej) => {
                    db.run(
                        'INSERT INTO todo (userId, messages, expirationDate) VALUES (?, ?, ?)',
                        [userId, msg, date],
                        function(err) {
                            if (err) rej(err);
                            else {
                                console.log(`Dodano rekord ID: ${this.lastID}`);
                                res();
                            }
                        }
                    );
                })
            );

            Promise.all(inserts).then(resolve).catch(reject);
        }
    );
});
    }

    rl.close();
    db.close((err) => {
        if (err) console.error('Błąd przy zamykaniu bazy:', err.message);
        else console.log('Połączenie z bazą zakończone.');
    });
}

seedDatabase();
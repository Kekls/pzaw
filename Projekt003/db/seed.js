import db from './connection.js';

const insertTestData = [
    ['test1', new Date().toLocaleString('pl-PL')],
    ['test2', new Date().toLocaleString('pl-PL')],
    ['test3', new Date().toLocaleString('pl-PL')],
    ['test4', new Date().toLocaleString('pl-PL')],
    ['test5', new Date().toLocaleString('pl-PL')]
];

function seedDatabase() {
    insertTestData.forEach(([msg, date]) => {
        db.run(
            'INSERT INTO todo (messages, expiration_date) VALUES (?, ?)',
            [msg, date],
            function(err) {
                if (err) {
                    console.error('Błąd podczas wstawiania:', err.message);
                } else {
                    console.log(`Dodano rekord ID: ${this.lastID}`);
                }
            }
        );
    });

    db.close((err) => {
        if (err) {
            console.error('Błąd przy zamykaniu bazy:', err.message);
        } else {
            console.log('Połączenie z bazą zakończone.');
        }
    });
}

seedDatabase();
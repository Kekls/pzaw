import express from 'express';
import db from './db/connection.js';

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.post('/message', (req, res) => {

    db.run('INSERT INTO todo (messages, expiration_date) VALUES (?, ?)',
    [req.body.message, req.body.date],
    function(err) {
        if (err) console.error('Błąd podczas wstawiania:', err.message);
        else console.log(`Dodano rekord ID: ${this.lastID}`);
    });
    res.redirect('/');
})

app.get('/', (req,res) => {
    db.all('SELECT * FROM todo', [], (err,rows) => {
        if(err) {
            res.status(500).send('Błąd serwera');
            return;
        } else {
            const data = {
                currentTime: new Date().toLocaleString('pl-PL'),
                messages: rows
            };
            res.render('index', data);
        }      
    });
});

app.post('/clear', (req, res) => {
    db.run("DELETE FROM todo",
    function(err){
        if (err) return console.error(err.message);
        else console.log(`Usunięto rekordy: ${this.changes}`);
    });
    res.redirect('/');
})

app.post('/delete/:id', (req, res) => {
    db.run('DELETE FROM todo WHERE id = ?',
    [parseInt(req.params.id)],
    function(err) {
        if (err) return console.error(err.message);
        else console.log(`Usunięto rekordy: ${this.changes}`);
    });
    res.redirect('/');
})

app.listen(PORT, ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
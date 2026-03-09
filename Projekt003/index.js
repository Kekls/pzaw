import express from 'express';
import db from './db/connection.js';

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

//---------------index.ejs

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
                messages: rows//to jest to messages w index.ejs
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

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    
    res.render('edit', { id });
});

//---------------edit.ejs

app.post('/edited/:id', (req, res) => {

    let mes = req.body.message;
    let date = req.body.date;
    let id = parseInt(req.params.id);

    db.get('SELECT * FROM todo WHERE id = ?', [id], (err, row) => {

        if (err) {
            res.status(500).send('Błąd serwera');
            return;
        }

        if (mes == "") mes = row.messages;
        if (date == "") date = row.expiration_date;

        db.run(
            "UPDATE todo SET messages = ?, expiration_date = ? WHERE id = ?",
            [mes, date, id],
            function(err) {

                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Edytowano rekordy: ${this.changes}`);
                }

                res.redirect('/');
            }
        );
    });
});

//---------------main

app.get('/return', (req,res)=>{
    res.redirect('/');
})

app.listen(PORT, ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
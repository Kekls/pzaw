import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/', (req,res) => {
    db.all('SELECT * FROM todo', [], (err,rows) => {
        if(err) {
            res.status(500).send('Błąd serwera');
            return;
        } else {
            const data = {
                currentTime: new Date().toLocaleString('pl-PL'),
                messages: rows//to jest to messages w index.ejs
            };
            res.render('main', data);
        }      
    });
});

router.post('/message', (req, res) => {

    db.run('INSERT INTO todo (messages, expiration_date) VALUES (?, ?)',
    [req.body.message, req.body.date],
    function(err) {
        if (err) console.error('Błąd podczas wstawiania:', err.message);
        else console.log(`Dodano rekord ID: ${this.lastID}`);
    });
    res.redirect('/main');
})

router.post('/clear', (req, res) => {
    db.run("DELETE FROM todo",
    function(err){
        if (err) return console.error(err.message);
        else console.log(`Usunięto rekordy: ${this.changes}`);
    });
    res.redirect('/main');
})

router.post('/delete/:id', (req, res) => {
    db.run('DELETE FROM todo WHERE id = ?',
    [parseInt(req.params.id)],
    function(err) {
        if (err) return console.error(err.message);
        else console.log(`Usunięto rekordy: ${this.changes}`);
    });
    res.redirect('/main');
})

export default router;
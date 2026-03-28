import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/', (req,res) => {
    if(!req.session.userId)
        return res.redirect('/');
    db.all('SELECT * FROM todo WHERE userId = ?', [req.session.userId], (err,rows) => {
        if(err) {
            res.status(500).send('Błąd serwera');
            return;
        } else {
            const data = {
                currentTime: new Date().toLocaleString('pl-PL'),
                messages: rows,//to jest to messages w index.ejs
                isAdmin: req.session.isAdmin,
                userId: req.session.userId
            };
            res.render('main', data);
        }      
    });
});

router.post('/message', (req, res) => {

    db.run('INSERT INTO todo (messages, expirationDate, userId) VALUES (?, ?, ?)',
    [req.body.message, req.body.date, req.session.userId],
    function(err) {
        if (err) console.error('Błąd podczas wstawiania:', err.message);
        else console.log(`Dodano rekord ID: ${this.lastID}`);
    });
    res.redirect('/main');
})

router.post('/clear', (req, res) => {
    db.run("DELETE FROM todo WHERE userId = ?", [req.session.userId],
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

        const allowed = ['/main', '/adminPanel'];
        const redirectTo = allowed.includes(req.body.URLfrom) ? req.body.URLfrom : '/';
        res.redirect(redirectTo); 
    });
})

router.post('/adminPanel', (req, res) => {
    res.redirect('/adminPanel')
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

export default router;
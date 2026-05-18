import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/', (req,res) => {
    try{
        const rows = db.prepare('SELECT * FROM todo WHERE userId = ?').all(req.session.userId);
        const data = {
                currentTime: new Date().toLocaleString('pl-PL'),
                messages: rows,//to jest to messages w index.ejs
                isAdmin: req.session.isAdmin,
                userId: req.session.userId
            };
        res.render('main', data);

    } catch(err){
        console.error(err);
        res.status(500).send('Błąd serwera');
        return;
    }
});

router.post('/message', (req, res) => {
    if (!req.body.message?.trim()) return res.redirect('/main');

    try{
        db.prepare('INSERT INTO todo (messages, expirationDate, userId) VALUES (?, ?, ?)').run(req.body.message, req.body.date, req.session.userId);
    } catch(err){
        console.error('Błąd podczas wstawiania:', err.message);
    }

    res.redirect('/main');
})

router.post('/clear', (req, res) => {
    try{
        const result = db.prepare('DELETE FROM todo WHERE userId = ?').run(req.session.userId);
        console.log(`Usunięto rekordy: ${result.changes}`);
    } catch(err){
        console.error(err);
    }

    res.redirect('/main');
})

router.post('/delete/:id', (req, res) => {
    try {

        let result;
        if (req.session.isAdmin && req.body.URLfrom === '/adminPanel') {

            result = db.prepare(
                'DELETE FROM todo WHERE id = ?'
            ).run(req.params.id);

        } else {

            result = db.prepare(
                'DELETE FROM todo WHERE id = ? AND userId = ?'
            ).run(req.params.id, req.session.userId);

        }

        console.log(`Usunięto rekordów: ${result.changes}`);

    } catch (err) {
        console.error(err);
    }

    const allowed = ['/main', '/adminPanel'];
    const redirectTo = allowed.includes(req.body.URLfrom)
        ? req.body.URLfrom
        : '/main';

    res.redirect(redirectTo);
});

router.post('/adminPanel', (req, res) => {
    res.redirect('/adminPanel')
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

export default router;
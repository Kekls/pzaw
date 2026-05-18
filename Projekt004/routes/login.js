import express from 'express';
import db from '../db/connection.js';
import argon2 from 'argon2';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { error: null, login: null, password:null });
});

router.post('/login', async (req, res) => {
    try{
        const row = db.prepare('SELECT * FROM users WHERE login LIKE ?').get(req.body.login);

        if(!row) return res.render('login', { error: "Nie Poprawne hasło lub login użytkownika", login: req.body.login, password: req.body.password });

        const isValid = await argon2.verify(row.password, req.body.password);

        if (!isValid) return res.render('login', { error: "Nie Poprawne hasło lub login użytkownika", login: req.body.login, password: req.body.password });

        req.session.userId = row.id;
        req.session.isAdmin = row.isAdmin;
        res.redirect('/main');

    } catch(err){
        console.error(err);
        return res.render('login', { error: "Wystąpił błąd serwera" });
    }
});

export default router;
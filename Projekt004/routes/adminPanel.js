import express from 'express';
import db from '../db/connection.js';
import argon2 from 'argon2';

const defaultInfo = {errorLogin: null, errorPassword: null, errorPasswordAgain: null}
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const rowsT = db.prepare('SELECT * FROM todo').all();
        const rowsU = db.prepare('SELECT * FROM users').all();

        res.render('adminPanel', {
            currentTime: new Date().toLocaleString('pl-PL'),
            messages: rowsT,
            users: rowsU,
            isAdmin: req.session.isAdmin,
            userId: req.session.userId
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd serwera');
    }
});

router.post('/deleteUser/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deleteUser = db.transaction((id) => {
            const r1 = db.prepare('DELETE FROM todo WHERE userId = ?').run(id);
            const r2 = db.prepare('DELETE FROM users WHERE id = ?').run(id);

            console.log(r1.changes, r2.changes);
        });

        deleteUser(id);

        res.redirect('/adminPanel');

    } catch (err) {
        console.error(err);
        return res.redirect('/adminPanel');
    }
});

router.get('/editUser/:id', (req, res) => {
    if(!req.session.isAdmin)
        return res.redirect('/');
    const id = req.params.id;
    res.render('userForm', {...defaultInfo, login: null, password: null, passwordAgain: null, title: "Rejestracja myTodos", action: "/adminPanel", id: id});
})

router.post('/editUser/:id', async (req, res) => {
    let user = req.body.login;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin === 'on' ? 1 : 0;
    let id = parseInt(req.params.id);

    let info = {errorLogin: null,
        errorPassword: null,
        errorPasswordAgain: null, 
        login: req.body.login,
        password: req.body.password,
        passwordAgain: req.body.passwordAgain,
        title: "Edycja użytkownika",
        action: "/adminPanel",
        id: id
    };

    try{

        const row = db.prepare('SELECT 1 FROM users WHERE login = ? AND id != ? LIMIT 1').get(req.body.login, id)

        const password = req.body.password ?? '';
        const passwordAgain = req.body.passwordAgain ?? '';

        if (row) info.errorLogin = "Ten login jest już zajęty!";

        if (password.length < 6 || passwordAgain.length < 6) {
            if(password.length < 6) info.errorPassword =  "Hasło musi mieć min. 6 znaków";
            if(passwordAgain.length < 6) info.errorPasswordAgain =  "Hasło musi mieć min. 6 znaków";
        }

        if (password !== passwordAgain) info.errorPasswordAgain = "Hasła nie są takie same!";

        if (info.errorLogin || info.errorPasswordAgain || info.errorPassword) return res.render('userForm', info);

        const hash = await argon2.hash(password);

        db.prepare('UPDATE users SET login = ?, password = ?, isAdmin = ? WHERE id = ?').run(req.body.login, hash, isAdmin, id);

        res.redirect('/adminPanel');

    } catch(err){
        console.error(err);
        res.status(500).send('Błąd serwera');
        return res.render('userForm', info);
    }
});


export default router;
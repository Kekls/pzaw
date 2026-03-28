import express from 'express';
import db from '../db/connection.js';
import argon2 from 'argon2';
const router = express.Router();
const defaultInfo = {errorLogin: null, errorPassword: null, errorPasswordAgain: null}

router.get('/', (req,res) => {
    res.render('userForm', {...defaultInfo, login: null, password: null, passwordAgain: null, title: "Rejestracja myTodos", action: "/register/register", id: null});
})

router.post('/register', (req, res) => {
    let info = {...defaultInfo, login: req.body.login , password: req.body.password,  passwordAgain: req.body.passwordAgain, title: "Rejestracja myTodos", action: "/register/register", id : null};
    db.get('SELECT 1 FROM users WHERE login = ? LIMIT 1', [req.body.login], async (err, row) => {
        if (err) return console.error(err);
        if (row) info.errorLogin = "Ten login jest już zajęty!";

        if (req.body.password !== req.body.passwordAgain) info.errorPasswordAgain = "Hasła nie są takie same!";

        if (info.errorLogin || info.errorPasswordAgain || info.errorPassword) {
            return res.render('userForm', info);
        }

        try{
            const hash =  await argon2.hash(req.body.password) 

            db.run('INSERT INTO users (login, password) VALUES (?, ?)', [req.body.login, hash], (err) => {
                if (err) {
                    info.errorLogin = "Błąd przy dodawaniu do bazy";
                    return res.render('userForm', info);
                }
                res.redirect('/');
            });
        }catch(err){
            console.error(err);
            info.errorPassword = "Błąd serwera, spróbuj ponownie";
            return res.render('userForm', info);
        }
    });
}); 

export default router;
import express from 'express';
import db from '../db/connection.js';
import argon2 from 'argon2';
const router = express.Router();
const defaultInfo = {errorLogin: null, errorPassword: null, errorPasswordAgain: null}

router.get('/', (req,res) => {
    res.render('userForm', {...defaultInfo, login: null, password: null, passwordAgain: null, title: "Rejestracja myTodos", action: "/register/register", id: null});
})

router.post('/register', async (req, res) => {
    const password = req.body.password ?? '';
    const passwordAgain = req.body.passwordAgain ?? '';
    
    const info = {
        ...defaultInfo,
        login: req.body.login,
        password: password,
        passwordAgain: passwordAgain,
        title: "Rejestracja myTodos",
        action: "/register/register",
        id: null
    };

    if (password.length < 6 || passwordAgain.length < 6) {
        if(password.length < 6) info.errorPassword =  "Hasło musi mieć min. 6 znaków";
        if(passwordAgain.length < 6) info.errorPasswordAgain =  "Hasło musi mieć min. 6 znaków";
        return res.render('userForm', info);
    }

    if (password !== passwordAgain) {
        info.errorPasswordAgain = "Hasła nie są takie same!";
        return res.render('userForm', info);
    }

    try {
        const hash = await argon2.hash(password);

        db.prepare(
            'INSERT INTO users (login, password) VALUES (?, ?)'
        ).run(req.body.login, hash);

        res.redirect('/');
    } catch (err) {
        console.error(err);

        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            info.errorLogin = "Ten login jest już zajęty!";
            return res.render('userForm', info);
        }

        info.errorPassword = "Błąd serwera, spróbuj ponownie";
        return res.render('userForm', info);
    }
});
export default router;
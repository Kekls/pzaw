import express, { application } from 'express';
import db from '../db/connection.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', (req,res) => {
    res.render('register', {errorLogin: null, login: null, errorPassword: null, password: null, errorPasswordAgain: null, passwordAgain: null});
})

router.post('/register', (req, res) => {
    let info = {errorLogin: null, login: req.body.login , errorPassword: null, password: req.body.password, errorPasswordAgain: null, passwordAgain: req.body.passwordAgain};
    db.get('SELECT 1 FROM users WHERE login = ? LIMIT 1', [req.body.login], (err, row) => {
        if (err) return console.error(err);
        if (row) info.errorLogin = "Ten login jest już zajęty!";

        if (req.body.password !== req.body.passwordAgain) info.errorPasswordAgain = "Hasła nie są takie same!";

        if (info.errorLogin || info.errorPasswordAgain || info.errorPassword) {
            return res.render('register', info);
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 12;
        bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                info.errorPassword = "Błąd przy hashowaniu hasła";
                return res.render('register', info);
            }

            db.run('INSERT INTO users (login, password) VALUES (?, ?)', [req.body.login, hashedPassword], (err) => {
                if (err) {
                    info.errorLogin = "Błąd przy dodawaniu do bazy";
                    return res.render('register', info);
                }
                res.redirect('/');
            });
        });
    });
}); 

export default router;
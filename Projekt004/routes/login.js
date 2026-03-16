import express from 'express';
import db from '../db/connection.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { error: null, login: null, password:null });
});

router.post('/login', (req,res) => {

    db.get('SELECT * FROM users WHERE login LIKE ?', [req.body.login], (err,row) => {
        if(err) console.error(err);
        if(!row)
            return res.render('login', { error: "Nie Poprawne hasło lub login użytkownika", login: req.body.login, password: req.body.password});

        bcrypt.compare(req.body.password, row.password, (err, result) =>{
            if (err) console.error(err);
            if (!result)
                return res.render('login', { error: "Nie Poprawne hasło lub login użytkownika", login: req.body.login, password: req.body.password});

            req.session.userId = row.id;
            req.session.isAdmin = row.isAdmin;
            req.session.URLfrom = '/login';
            res.redirect('/main');
        });    
    });
});

export default router;
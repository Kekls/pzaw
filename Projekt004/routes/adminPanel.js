import express from 'express';
import db from '../db/connection.js';
import argon2 from 'argon2';

const defaultInfo = {errorLogin: null, errorPassword: null, errorPasswordAgain: null}
const router = express.Router();

router.get('/', (req, res) =>{
    if(!req.session.userId || !req.session.isAdmin)
        return res.redirect('/main');
    
    db.all('SELECT * FROM todo', (err,rowsT) => {
        if(err) {
            res.status(500).send('Błąd serwera');
            console.error(err);
            return;
        } else {
            db.all('SELECT * FROM users', (err,rowsU) => {
                if(err) {
                    res.status(500).send('Błąd serwera');
                    console.error(err);
                    return;
                } else {
                    const data = {
                        currentTime: new Date().toLocaleString('pl-PL'),
                        messages: rowsT,//to jest to messages w index.ejs
                        users: rowsU,
                        isAdmin: req.session.isAdmin,
                        userId: req.session.userId
                    };
                    return res.render('adminPanel', data);
                }      
            });
        }      
    });
});

router.post('/deleteUser/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.run('DELETE FROM todo WHERE userId = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.redirect('/adminPanel');
        }
        console.log(`Usunięto todo użytkownika o id: ${id}, zmiany: ${this.changes}`);
        db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
            if (err) {
                console.error(err.message);
                return res.redirect('/adminPanel');
            }
            console.log(`Usunięto użytkownika o id: ${id}, zmiany: ${this.changes}`);
            res.redirect('/adminPanel');
        });
    });
});

router.get('/editUser/:id', (req, res) => {
    if(!req.session.isAdmin)
        return res.redirect('/');
    const id = req.params.id;
    res.render('userForm', {...defaultInfo, login: null, password: null, passwordAgain: null, title: "Rejestracja myTodos", action: "/adminPanel", id: id});
})

router.post('/editUser/:id', (req, res) => {
    let user = req.body.login;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin === 'on' ? 1 : 0;
    let id = parseInt(req.params.id);
    let info = {errorLogin: null, errorPassword: null, errorPasswordAgain: null, login: req.body.login , password: req.body.password, passwordAgain: req.body.passwordAgain, title: "Edycja użytkownika", action: "/adminPanel", id: id};

    db.get('SELECT 1 FROM users WHERE login = ? AND id != ? LIMIT 1', [req.body.login, id], async (err, row) => {
        if (err) 
            return console.error(err);

        if (row) 
            info.errorLogin = "Ten login jest już zajęty!";

        if (req.body.password !== req.body.passwordAgain) 
            info.errorPasswordAgain = "Hasła nie są takie same!";

        if (info.errorLogin || info.errorPasswordAgain || info.errorPassword)
            return res.render('userForm', info);
        
        try{
            const hash = await argon2.hash(req.body.password)
            db.run('UPDATE users SET login = ?, password = ?, isAdmin = ? WHERE id = ?', [req.body.login, hash, isAdmin, id], (err) => {
                if (err) {
                    info.errorLogin = "Błąd przy edytowaniu bazy";
                    return res.render('userForm', info);
                }
                res.redirect('/adminPanel');
            });
        }catch(err){
            console.error(err);
            info.errorPassword = "Błąd serwera, spróbuj ponownie";
            return res.render('userForm', info);
        }
    });
});


export default router;
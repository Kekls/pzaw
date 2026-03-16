import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/', (req, res) =>{
    if(!req.session.userId || !req.session.isAdmin)
        return res.redirect('/main');
    req.session.URLfrom = '/adminPanel';
    
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


export default router;
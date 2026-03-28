import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/:id', (req, res) => {
    if(!req.session.userId)
        return res.redirect('/');
    const id = req.params.id;
    const URLfrom = req.query.URLfrom;
    res.render('edit', { id, URLfrom });
});

router.post('/:id', (req, res) => {

    let mes = req.body.message;
    let date = req.body.date;
    let id = parseInt(req.params.id);

    db.get('SELECT * FROM todo WHERE id = ?', [id], (err, row) => {

        if (err) {
            res.status(500).send('Błąd serwera');
            return;
        }

        if (row.userId !== req.session.userId && !req.session.isAdmin)
            return res.status(403).send('Brak dostępu')

        if (mes == "") mes = row.messages;
        if (date == "") date = row.expirationDate;

        db.run(
            "UPDATE todo SET messages = ?, expirationDate = ? WHERE id = ?",
            [mes, date, id],
            function(err) {

                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Edytowano rekordy: ${this.changes}`);
                }
                
                const allowed = ['/main', '/adminPanel'];
                const redirectTo = allowed.includes(req.body.URLfrom) ? req.body.URLfrom : '/';
                res.redirect(redirectTo);                  
            }
        );
    });
});

export default router;
import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    res.render('edit', { id });
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

        if (mes == "") mes = row.messages;
        if (date == "") date = row.expiration_date;

        db.run(
            "UPDATE todo SET messages = ?, expiration_date = ? WHERE id = ?",
            [mes, date, id],
            function(err) {

                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Edytowano rekordy: ${this.changes}`);
                }

                res.redirect('/main');
            }
        );
    });
});

export default router;
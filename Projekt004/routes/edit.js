import express from 'express';
import db from '../db/connection.js';
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const URLfrom = req.query.URLfrom;
    res.render('edit', { id, URLfrom });
});

router.post('/:id', (req, res) => {
    let id = parseInt(req.params.id);

    try{

        const row = db.prepare('SELECT * FROM todo WHERE id = ?').get(id);

        const mes = req.body.message?.trim() || row.messages;
        const date = req.body.date?.trim() || row.expirationDate;

        if (!row) return res.status(404).send('Nie znaleziono');

        if (row.userId !== req.session.userId && !req.session.isAdmin)
            return res.status(403).send('Brak dostępu')

        db.prepare('UPDATE todo SET messages = ?, expirationDate = ? WHERE id = ?').run(mes, date, id);

        const allowed = ['/main', '/adminPanel'];
        const redirectTo = allowed.includes(req.body.URLfrom) ? req.body.URLfrom : '/';
        res.redirect(redirectTo); 

    } catch(err){
        console.error(err);
        return res.status(500).send('Błąd serwera');
    }
});

export default router;
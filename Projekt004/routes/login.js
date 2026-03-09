import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { error: null });
});

router.post('/login', (req,res) => {
    res.redirect('/main');
})

export default router;
import express from 'express';

const app = express();
const PORT = 8080;
const messages = [];

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

app.post('/message', (req, res) => {
    const newMessage = req.body.message;
    messages.push(newMessage);
    res.redirect('/');
})

app.get('/', (req,res) => {
    const data = {
        currentTime: new Date().toLocaleString('pl-PL'),
        messages: messages
    };
    res.render('index', data)

});

app.post('/clear', (req, res) => {
    messages.length = 0;
    res.redirect('/');
})

app.listen(PORT, ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
import express from 'express';

const app = express();
const PORT = 8080;
const messages = [];
let idCount = 0;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.post('/message', (req, res) => {
    let tempObject = {
        id: idCount,
        message: req.body.message,
        date: req.body.date
    }
    const newMessage = tempObject;
    messages.push(newMessage);
    idCount++;
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

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = messages.findIndex(m => m.id === id);
    if(index !== -1){
        messages.splice(index, 1);
    }
    res.redirect('/');
})

app.listen(PORT, ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
import 'dotenv/config';//.env
import express from 'express';//expresig
import mainRoutes from './routes/main.js';//ekran todo
import editRoutes from './routes/edit.js';//ekran edytowania
import loginRoutes from './routes/login.js';//ekran logowania
import registerRoutes from './routes/register.js';//ekran rejestracji
import adminPanel from './routes/adminPanel.js';//ekran panelu administratora
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(session({//ustawienia sesji
    secret: process.env.SESSION_SECRET || "1234",
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({extended: true}));
app.use('/main', mainRoutes);
app.use('/edit', editRoutes);
app.use('/register', registerRoutes);
app.use('/adminPanel', adminPanel);
app.use('/', loginRoutes);

app.listen(PORT, '0.0.0.0', ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
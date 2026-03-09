import express from 'express';
import mainRoutes from './routes/main.js';
import editRoutes from './routes/edit.js';
import loginRoutes from './routes/login.js';

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use('/main', mainRoutes);
app.use('/edit', editRoutes);
app.use('/', loginRoutes);

app.listen(PORT, '0.0.0.0', ()=> {
    console.log(`Serwer dziala na http://localhost:${PORT}`);
});
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());

app.set('views', path.join(__dirname, '..', '..', 'build'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.get('/', router);

app.listen(3000);

import express from 'express';
import bodyParser from 'body-parser';
import api from './routes';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, '..', '..', 'build'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.use('/api', api);
app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(3000);
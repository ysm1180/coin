import express from 'express';
import bodyParser from 'body-parser';
import api from './routes';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// const db = mongoose.connection;
// db.on('error', console.error);
// db.on('open', function() {
//   console.log('DB CONNECTED');
// })
// mongoose.connect('mongodb://192.168.10.156/coin'); // Your MongoDB Server IP

// process.on('exit', function() {
//   console.log('DB CLOSED');
//   db.close();
// });

// process.on('SIGINT', function() {
//   console.log('DB CLOSED');
//   db.close();
//   exit(2);
// })

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


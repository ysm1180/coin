import express from 'express';
import bodyParser from 'body-parser';
import api from './routes';

const app = express();

app.use('/api', api);

app.listen(3000);

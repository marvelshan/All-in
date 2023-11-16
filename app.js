import express from 'express';
import oddsRouter from './routes/odds.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/odds', oddsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

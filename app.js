import express from 'express';
import { createServer } from 'http';

import cookieParser from 'cookie-parser';
import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
import userRouter from './routes/user.js';
import chargeRouter from './routes/charge.js';
import rankRouter from './routes/rank.js';
import initializeWebSocket from './utils/socket.js';
// import client from './utils/cache.js';

const app = express();
const httpServer = createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/odds', oddsRouter);
app.use('/game', gameRouter);
app.use('/user', userRouter);
app.use('/topUp', chargeRouter);
app.use('/rank', rankRouter);

initializeWebSocket(httpServer);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

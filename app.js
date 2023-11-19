import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
import userRouter from './routes/user.js';
import chargeRouter from './routes/charge.js';
import rankRouter from './routes/rank.js';
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

const io = new Server(httpServer, {});
let likes = 0;
io.on('connection', (socket) => {
  console.log('connect');
  socket.emit('likeupdated', likes);
  socket.on('liked', () => {
    likes += 1;
    socket.emit('likeupdated', likes);
    socket.broadcast.emit('likeupdated', likes);
  });
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

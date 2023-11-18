import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
// import userRouter from './routes/user.js';
// import client from './utils/cache.js';

const app = express();
const httpServer = createServer(app);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use('/odds', oddsRouter);
app.use('/game', gameRouter);
// app.use('/user', userRouter);

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

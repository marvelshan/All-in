import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
import userRouter from './routes/user.js';
import chargeRouter from './routes/charge.js';
import rankRouter from './routes/rank.js';
import adminRouter from './routes/admin.js';
import { initializeWebSocket } from './utils/socket.js';

const app = express();
const httpServer = createServer(app);

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const adminPagePath = join(currentDir, '.', 'public', 'home.html');
  res.sendFile(adminPagePath);
});

app.use('/odds', oddsRouter);
app.use('/game', gameRouter);
app.use('/user', userRouter);
app.use('/topUp', chargeRouter);
app.use('/rank', rankRouter);
app.use('/admin', adminRouter);
app.use('/admin.html', adminRouter);
app.use(express.static('public'));

initializeWebSocket(httpServer);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

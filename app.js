import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import path from 'path';

import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
import userRouter from './routes/user.js';
import chargeRouter from './routes/charge.js';
import rankRouter from './routes/rank.js';
import adminRouter from './routes/admin.js';
import initializeWebSocket from './utils/socket.js';

const app = express();
const httpServer = createServer(app);
const swaggerDocument = JSON.parse(
  fs.readFileSync(`${path.resolve()}/swagger-output.json`).toString(),
);

app.use(cookieParser());
app.use(express.json());
app.use('/odds', oddsRouter);
app.use('/game', gameRouter);
app.use('/user', userRouter);
app.use('/topUp', chargeRouter);
app.use('/rank', rankRouter);
app.use('/admin', adminRouter);
app.use('/admin.html', adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));

initializeWebSocket(httpServer);

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

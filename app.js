import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import path from 'path';
import cluster from 'cluster';
import os from 'os';

import oddsRouter from './routes/odds.js';
import gameRouter from './routes/game.js';
import userRouter from './routes/user.js';
import chargeRouter from './routes/charge.js';
import rankRouter from './routes/rank.js';
import initializeWebSocket from './utils/socket.js';

const app = express();
const httpServer = createServer(app);
const swaggerDocument = JSON.parse(
  fs.readFileSync(`${path.resolve()}/swagger-output.json`).toString(),
);
const cCPUs = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cCPUs; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static('public'));
  app.use('/odds', oddsRouter);
  app.use('/game', gameRouter);
  app.use('/user', userRouter);
  app.use('/topUp', chargeRouter);
  app.use('/rank', rankRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  initializeWebSocket(httpServer);

  const port = 3000;
  httpServer.listen(port, () => {
    console.log(`Server is working on ${port}`);
  });
}

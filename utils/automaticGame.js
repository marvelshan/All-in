import express from 'express';
import axios from 'axios';

import client from './cache.js';
import * as game from '../model/game.js';

const app = express();
app.use(express.json());

const id = 22200001;
let currentTime = 0;

const gameCacheData = JSON.parse(await client.get('gameDate'));
try {
  if (gameCacheData === null) {
    const gameData = await game.getNBAGameLog(id);
    await client.set('gameDate', JSON.stringify(gameData));
    axios.post('/');
  }
} catch (error) {
  console.log(`automaticGame store game in redis error on ${error}`);
}

async function processEvent(index) {
  // When game is over and repeat it again
  if (
    gameCacheData[index].de === 'Game End' &&
    gameCacheData[index].hs !== gameCacheData[index].vs &&
    gameCacheData[index].period === 4
  ) {
    axios.post('/');
  }
  if (index < gameCacheData.length) {
    const event = gameCacheData[index];
    const timeDiff = (new Date(event.wallclk) - currentTime) / 10;
    currentTime = new Date(event.wallclk);
    const asyncCallback = async () => {
      processEvent(index + 1);
      const gameData = {
        data: gameCacheData[index],
      };
      await client.publish('dataUpdated', JSON.stringify(gameData));
    };
    setTimeout(asyncCallback, timeDiff);
  }
}
processEvent(0);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

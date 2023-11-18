import express from 'express';
import axios from 'axios';
// import client from './cache.js';
import * as game from '../model/game.js';

const app = express();
app.use(express.json());
// function handleEvent(event) {
//   console.log(`Time: ${event.wallclk} - Event: ${event.cl} - ${event.de}`);
// }

const id = 22200001;
const gameData = await game.getNBAGameLog(id);
let currentTime = 0;

async function processEvent(index) {
  // When game is over and repeat it again
  if (
    gameData.cl === 0 &&
    gameData.hs !== gameData.vs &&
    gameData.period === 4
  ) {
    axios.post('/', { id });
  }
  if (index < gameData.length) {
    const event = gameData[index];
    const timeDiff = (new Date(event.wallclk) - currentTime) / 10;
    currentTime = new Date(event.wallclk);
    const asyncCallback = async () => {
      // handleEvent(event);
      processEvent(index + 1);
      try {
        const gameEvent = `Time: ${event.wallclk} - Event: ${event.cl} - ${event.de}`;
        await game.insertRealtimeEvent(gameEvent);
      } catch (error) {
        console.log(`${error}`);
      }

      // const gameRedis = await client.set(
      //   'realtimeGameInformation',
      //   JSON.stringify(
      //     `Time: ${event.wallclk} - Event: ${event.cl} - ${event.de}`,
      //   ),
      // );
      // console.log(gameRedis);
      // await client.publish('dataUpdated', JSON.stringify('updated'));
    };
    setTimeout(asyncCallback, timeDiff);
  }
}
processEvent(0);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});

import { client } from './cache.js';

const games = [];
const startTime = [];
const number = [];

function gameSetTimeOut(id) {
  for (let i = 1; i < number[games.indexOf(id)]; i += 1) {
    putGameEventIntoRedis(id);
  }
}

async function gamePopFromRedis() {
  const id = await client.lpop('game');
  const startTimeInRedis = await client.lpop('startTime');
  const numberInRedis = await client.lpop('number');
  games.push(id);
  startTime.push(startTimeInRedis);
  number.push(numberInRedis);
  gameSetTimeOut(id);
}

async function putGameEventIntoRedis(id) {
  const gameEvent = await client.lpop(`gameRedis${id}`);
  const event = JSON.parse(gameEvent);
  const timeDiff =
    (new Date(event.wallclk) - new Date(startTime[games.indexOf(id)])) / 20;
  setTimeout(async () => {
    await client.publish('game', id);
    await client.set(`game${id}`, JSON.stringify(event));
    const nextGameId = await client.lindex('game', 0);
    if (nextGameId !== null) {
      gamePopFromRedis();
    }
  }, timeDiff);
}

gamePopFromRedis();

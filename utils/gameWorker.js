import axios from 'axios';
import { client } from './cache.js';
import * as userModel from '../model/user.js';

const games = [];
const startTime = [];
const number = [];

async function gameEnd(event, id) {
  if (event.de === 'Game End') {
    if (event.hs > event.vs) {
      const host = 'home';
      await userModel.updateUserPerBetResult(id, host);
    } else if (event.hs < event.vs) {
      const host = 'away';
      await userModel.updateUserPerBetResult(id, host);
    }
    const winUserInfor = await userModel.selectWinUser(id);
    winUserInfor.forEach(async (data) => {
      const winningPoint =
        data.betting_point * parseFloat(data.betting_odds) * -1;
      await userModel.changeUserPoint(winningPoint, data.member_id);
    });
    setTimeout(
      () => {
        const nextId = parseInt(id, 10);
        axios
          .post('/game/start', {
            id: nextId,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error making HTTP request:', error);
          });
        // Cuz game emulator will repeat so web need to
        // delete bet information to make last game bet information will not influence next game
        userModel.deleteBetInfor(id);
      },
      5 * 60 * 1000,
    );
  }
}

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
    (new Date(event.wallclk) - new Date(startTime[games.indexOf(id)])) / 10;
  setTimeout(async () => {
    await client.publish('game', id);
    await client.set(`game${id}`, JSON.stringify(event));
    const nextGameId = await client.lindex('game', 0);
    if (nextGameId !== null) {
      gamePopFromRedis();
    }
    gameEnd(event, id);
  }, timeDiff);
}

gamePopFromRedis();

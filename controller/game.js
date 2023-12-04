import { exec } from 'child_process';
import * as model from '../model/game.js';
import { client } from '../utils/cache.js';

// child process
function childProcess(address) {
  return new Promise((resolve, reject) => {
    const command = `node ${address}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error, stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

// child process
function startChildProcess() {
  childProcess('./utils/gameWorker.js')
    .then(() => {
      console.log('Success');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export const startGameEventInRedis = async (req, res) => {
  try {
    const { id } = req.body;
    const gameData = await model.getNBAGameLog(id);
    client.rpush('game', id);
    client.rpush('startTime', gameData[0].wallclk);
    client.rpush('number', gameData.length);
    gameData.forEach(async (element, i) => {
      await client.rpush(`gameRedis${id}`, JSON.stringify(gameData[i]));
    });
    startChildProcess();

    res
      .status(200)
      .send({ success: true, message: 'Successfully put into Redis' });
  } catch (error) {
    console.log(`startGameEventInRedis controller error on ${error}`);
  }
};

export const putGameEventInRedis = async (req, res) => {
  try {
    const { id } = req.body;
    const gameDataFromRedis = await client.get(`game${id}`);
    const gameData = JSON.parse(gameDataFromRedis);
    const gameTeamName = await model.getGameTeamName(id);
    res.status(200).json({ gameData, gameTeamName });
  } catch (error) {
    console.log(`putGameEventInRedis controller error on ${error}`);
  }
};

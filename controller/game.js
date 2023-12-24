import { CronJob } from 'cron';
import * as model from '../model/game.js';
import * as userModel from '../model/user.js';
import { client } from '../utils/cache.js';
import { io } from '../utils/socket.js';
import { closeAutoScaling, describeAutoScaling } from '../utils/aws.js';
import oddCalculator from '../utils/oddsCalculator.js';

function cronToDateTime(cronExpression) {
  const cronParts = cronExpression.split(' ');
  const [minutes, hours, day, month] = cronParts;
  const date = `2023/${month}/${day} ${hours}:${minutes}`;
  return { date };
}

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

export const cleanGameEvent = async (id) => {
  try {
    const data = {
      de: 'The competition has not yet started.',
      hs: 0,
      vs: 0,
      GAME_ID: id,
    };
    await client.set(`game${id}`, JSON.stringify(data));
  } catch (error) {
    console.log(`putGameEventInRedis controller error on ${error}`);
  }
};

export const getAllGame = async (req, res) => {
  try {
    const gameTeamName = await model.getAllGame();
    res.status(200).json(gameTeamName);
  } catch (error) {
    console.log(`getAllGame controller error on ${error}`);
  }
};

export const startGameEvent = async (req, res) => {
  try {
    const adminIdInSQL = 66;
    const openAutoScalingGameId = 22200001;
    const repeatGameIds = [22200001, 22200002, 22200003, 22200004];
    const openAutoScalingPeriod = 4;
    const timeRatioOfGame = 2;
    const { id } = req.body;

    await oddCalculator(id);
    const gameData = await model.getNBAGameLog(id);
    await model.changeGameStatus(id, 'playing');
    userModel.insertUserPerBet(adminIdInSQL, id, 0, 0, 'home');
    userModel.insertUserPerBet(adminIdInSQL, id, 0, 0, 'away');

    gameData.forEach(async (element) => {
      const timeDiff =
        (new Date(element.wallclk) - new Date(gameData[0].wallclk)) /
        timeRatioOfGame;
      setTimeout(async () => {
        io.emit('gameEvent', element);
        await client.set(`game${id}`, JSON.stringify(element));
        if (
          element.de === 'Start Period' &&
          parseInt(element.period, 10) === openAutoScalingPeriod &&
          parseInt(element.GAME_ID, 10) === openAutoScalingGameId
        ) {
          describeAutoScaling();
        }
        if (element.de === 'Game End') {
          if (parseInt(element.GAME_ID, 10) === openAutoScalingGameId) {
            closeAutoScaling();
          }

          if (element.hs > element.vs) {
            await userModel.updateUserPerBetResult(id, 'home');
            await userModel.updateLoseBetResult(id, 'away');
          } else if (element.hs < element.vs) {
            await userModel.updateUserPerBetResult(id, 'away');
            await userModel.updateLoseBetResult(id, 'home');
            const winUserInfor = await userModel.selectWinUser(id);
            winUserInfor.forEach(async (data) => {
              const winningPoint =
                data.betting_point * parseFloat(data.betting_odds) * -1;
              await userModel.changeUserPoint(winningPoint, data.member_id);
            });
            await userModel.deleteBetInfor(id);
            await model.changeGameStatus(id, 'waiting');
          }
          if (repeatGameIds.includes(parseInt(element.GAME_ID, 10))) {
            setTimeout(async () => {
              oddCalculator();
              startGameEvent();
            }, 1000 * 60);
          }
        }
      }, timeDiff);
    });

    res
      .status(200)
      .send({ success: true, message: `Successfully start game${id}` });
  } catch (error) {
    console.log(`startGameEvent controller error on ${error}`);
  }
};

export const schedule = async (req, res) => {
  try {
    const { time, id } = req.body;
    await cleanGameEvent(id);
    const cronJob = new CronJob(
      time,
      async () => {
        try {
          oddCalculator();
          startGameEvent();
        } catch (error) {
          console.error(`Error making schedule request: ${error.message}`);
        }
      },
      null,
      false,
      'Asia/Taipei',
    );
    const realTime = cronToDateTime(time);
    try {
      await model.insertGameSchedule(realTime.date, id);
    } catch (error) {
      console.log(`schedule insert DB controller error on ${error}`);
    }

    cronJob.start();
    res.status(200).json({
      success: true,
      message: 'Successfully put the game into schdule',
    });
  } catch (error) {
    console.log(`schedule controller error on ${error}`);
  }
};

export const getGameStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const gameStatus = await model.getGameStatus(id);
    res.status(200).json(gameStatus);
  } catch (error) {
    console.log(`getGameStatus controller error on ${error}`);
  }
};

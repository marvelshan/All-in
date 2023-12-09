import * as model from '../model/game.js';
import * as userModel from '../model/user.js';
import { client } from '../utils/cache.js';
import { io } from '../utils/socket.js';

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

export const getAllGame = async (req, res) => {
  try {
    const gameTeamName = await model.getAllGame();
    res.status(200).json(gameTeamName);
  } catch (error) {
    console.log(`putGameEventInRedis controller error on ${error}`);
  }
};

export const startGameEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const gameData = await model.getNBAGameLog(id);
    await model.changeGameStatus(id, 'playing');
    userModel.insertUserPerBet(66, id, 0, 0, 'home');
    userModel.insertUserPerBet(66, id, 0, 0, 'away');
    gameData.forEach(async (element) => {
      const timeDiff =
        (new Date(element.wallclk) - new Date(gameData[0].wallclk)) / 30;
      setTimeout(async () => {
        io.emit('gameEvent', element);
        await client.set(`game${id}`, JSON.stringify(element));
        if (element.de === 'Game End') {
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
            await model.changeGameStatus(id, 'end');
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

// import * as model from '../model/odds.js';
import * as userModel from '../model/user.js';
import { client } from '../utils/cache.js';
import { io } from '../utils/socket.js';

export const oddsManipulator = async (req, res, next) => {
  const { id, betPoint, hosting } = req.body;
  const point = parseInt(betPoint, 10);
  req.body.betPoint = point;
  try {
    // console.time('oddsManipulator');

    if (point === 0 || point < 0) {
      return res.status(404).json({
        success: false,
        message: 'Can not bet below 1',
      });
    }

    const lockKey = `odds${id}`;
    await client.watch(lockKey);
    // console.time('redisGet');
    const oddsInformation = JSON.parse(await client.get(`odds${id}`));
    // console.timeEnd('redisGet');

    let homeOdds = parseFloat(oddsInformation.homeOdds);
    let awayOdds = parseFloat(oddsInformation.awayOdds);
    if (hosting === 'home') {
      req.body.odds = homeOdds;
      oddsInformation.moneyBuffer -= point;
      if (
        oddsInformation.moneyBuffer <= 0 &&
        homeOdds <= 4 &&
        homeOdds > 0 &&
        awayOdds <= 4 &&
        awayOdds > 0
      ) {
        oddsInformation.moneyBuffer += 1000;
        homeOdds -= 0.01;
        awayOdds += 0.01;
      }
    } else {
      req.body.odds = awayOdds;
      oddsInformation.moneyBuffer += point;
      if (
        oddsInformation.moneyBuffer >= 1000 &&
        homeOdds <= 4 &&
        homeOdds > 0 &&
        awayOdds <= 4 &&
        awayOdds > 0
      ) {
        oddsInformation.moneyBuffer -= 1000;
        homeOdds += 0.01;
        awayOdds -= 0.01;
      }
    }
    const data = {
      id: oddsInformation.id,
      homeOdds: homeOdds.toFixed(2),
      awayOdds: awayOdds.toFixed(2),
      moneyBuffer: oddsInformation.moneyBuffer,
    };
    // console.time('redisMulti');
    const multi = await client.multi();
    multi.set(`odds${id}`, JSON.stringify(data));
    io.emit('odds', data);
    // console.timeEnd('redisMulti');

    const execResult = await multi.exec();
    if (!execResult) {
      return res.status(403).json({
        success: false,
        message: 'Transaction failed. Try again later.',
      });
    }
    // console.timeEnd('oddsManipulator');
    next();
  } catch (error) {
    console.log(`oddsManipulator controller is error on ${error}`);
  } finally {
    await client.unwatch();
  }
};

export const getOdds = async (req, res) => {
  try {
    const { id } = req.body;
    const oddsInformation = await client.get(`odds${id}`);
    res.status(200).json(oddsInformation);
  } catch (error) {
    console.log(`getOdds controller is error on ${error}`);
  }
};

export const changeUserPoint = async (req, res, next) => {
  try {
    // console.time('changeUserPoint');
    const { userId, betPoint } = req.body;
    await userModel.changeUserPoint(betPoint, userId);
    // console.timeEnd('changeUserPoint');
    next();
  } catch (error) {
    console.log(`controller changeUserPoint error on ${error}`);
  }
};

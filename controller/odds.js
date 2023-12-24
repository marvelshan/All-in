import {
  changeUserPoint,
  getUserInformation,
  insertUserPerBet,
} from '../model/user.js';
import { getBetPointOdds } from '../model/admin.js';
import { client } from '../utils/cache.js';
import { io } from '../utils/socket.js';

export const oddsManipulator = async (id, betPoint, hosting, req, res) => {
  const maxOdds = 4;
  const minOdds = 0.1;
  const resetBuffer = 1000;
  const oddsChangeRange = 0.01;
  const point = parseInt(betPoint, 10);
  req.body.betPoint = point;

  try {
    if (point === 0 || point < 0) {
      return res.status(404).json({
        success: false,
        message: 'Can not bet below 1',
      });
    }

    const lockKey = `odds${id}`;
    await client.watch(lockKey);
    const oddsInformation = JSON.parse(await client.get(`odds${id}`));

    let homeOdds = parseFloat(oddsInformation.homeOdds);
    let awayOdds = parseFloat(oddsInformation.awayOdds);
    if (hosting === 'home') {
      req.body.odds = homeOdds;
      oddsInformation.moneyBuffer -= point;
      if (
        oddsInformation.moneyBuffer <= 0 &&
        homeOdds <= maxOdds &&
        homeOdds > minOdds &&
        awayOdds <= maxOdds &&
        awayOdds > minOdds
      ) {
        oddsInformation.moneyBuffer += resetBuffer;
        homeOdds -= oddsChangeRange;
        awayOdds += oddsChangeRange;
      }
    } else {
      req.body.odds = awayOdds;
      oddsInformation.moneyBuffer += point;
      if (
        oddsInformation.moneyBuffer >= resetBuffer &&
        homeOdds <= maxOdds &&
        homeOdds > minOdds &&
        awayOdds <= maxOdds &&
        awayOdds > minOdds
      ) {
        oddsInformation.moneyBuffer -= resetBuffer;
        homeOdds += oddsChangeRange;
        awayOdds -= oddsChangeRange;
      }
    }
    const data = {
      id: oddsInformation.id,
      homeOdds: homeOdds.toFixed(2),
      awayOdds: awayOdds.toFixed(2),
      moneyBuffer: oddsInformation.moneyBuffer,
    };

    const multi = await client.multi();
    multi.set(`odds${id}`, JSON.stringify(data));
    io.emit('odds', data);

    const execResult = await multi.exec();
    if (!execResult) {
      return res.status(403).json({
        success: false,
        message: 'Transaction failed. Try again later.',
      });
    }
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

export const recordUserBet = async (req, res) => {
  try {
    const { id, betPoint, userId, odds, hosting } = req.body;
    await oddsManipulator(id, betPoint, hosting, req, res);
    const userPoint = await getUserInformation(userId);
    if (betPoint > userPoint[0].point) {
      return res.status(404).json({
        success: false,
        message: 'User do not have enough point',
      });
    }
    await changeUserPoint(betPoint, userId);
    await insertUserPerBet(userId, id, betPoint, odds, hosting);
    const barInfor = await getBetPointOdds();
    io.emit('barChart', barInfor);
    res.status(200).send({ success: true, message: 'Betted successfully' });
  } catch (error) {
    console.log(`controller recordUserBet error on ${error}`);
  }
};

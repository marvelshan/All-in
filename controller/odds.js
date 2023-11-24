// import * as model from '../model/odds.js';
import * as userModel from '../model/user.js';
import { client } from '../utils/cache.js';

export const oddsManipulator = async (req, res, next) => {
  try {
    const { id, betPoint, hosting } = req.body;
    const point = parseInt(betPoint, 10);
    req.body.betPoint = point;
    if (point === 0 || point < 0) {
      return res.status(404).send('Can not bet below 1');
    }
    const oddsInformation = JSON.parse(await client.get(`odds${id}`));
    let homeOdds = parseFloat(oddsInformation.home_odds);
    let awayOdds = parseFloat(oddsInformation.away_odds);
    if (hosting === 'home') {
      req.body.odds = homeOdds;
      oddsInformation.moneyBuffer -= point;
      if (oddsInformation.moneyBuffer <= 0) {
        oddsInformation.moneyBuffer += 1000;
        homeOdds -= 0.01;
        awayOdds += 0.01;
      }
    } else {
      req.body.odds = awayOdds;
      oddsInformation.moneyBuffer += point;
      if (oddsInformation.moneyBuffer >= 1000) {
        oddsInformation.moneyBuffer -= 1000;
        homeOdds += 0.01;
        awayOdds -= 0.01;
      }
    }
    const data = {
      id: oddsInformation.id,
      home_odds: homeOdds.toFixed(2),
      away_odds: awayOdds.toFixed(2),
      moneyBuffer: oddsInformation.moneyBuffer,
    };

    await client.publish('odds', id);
    await client.set(`odds${id}`, JSON.stringify(data));
    next();
  } catch (error) {
    console.log(`oddsManipulator controller is error on ${error}`);
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
    const { userId, betPoint } = req.body;
    await userModel.changeUserPoint(betPoint, userId);
    next();
  } catch (error) {
    console.log(`controller changeUserPoint error on ${error}`);
  }
};

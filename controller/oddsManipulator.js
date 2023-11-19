import * as model from '../model/odds.js';

const oddsManipulator = async (req, res) => {
  try {
    const { id, point, hosting } = req.body;
    if (point === 0 || point > 1000) {
      res.status(404).send('Cant bet over $1000 or below 1');
    }
    const oddsInformation = await model.getOdds(id);
    let homeOdds = parseFloat(oddsInformation.home_odds);
    let awayOdds = parseFloat(oddsInformation.away_odds);
    if (hosting === 'home') {
      oddsInformation.moneyBuffer -= point;
      if (oddsInformation.moneyBuffer <= 0) {
        oddsInformation.moneyBuffer += 1000;
        homeOdds += 0.01;
        awayOdds -= 0.01;
      }
    } else {
      oddsInformation.moneyBuffer += point;
      if (oddsInformation.moneyBuffer >= 1000) {
        oddsInformation.moneyBuffer -= 1000;
        homeOdds -= 0.01;
        awayOdds += 0.01;
      }
    }
    await model.updateOdds(
      oddsInformation.id,
      homeOdds,
      awayOdds,
      oddsInformation.moneyBuffer,
    );
    res.status(200).send('successful insertion');
  } catch (error) {
    console.log(`oddsManipulator controller is error on ${error}`);
  }
};

export default oddsManipulator;

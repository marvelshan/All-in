import * as model from '../model/odds.js';
import { client } from './cache.js';
import { io } from './socket.js';

const oddCalculator = async (id) => {
  const gameInformation = await model.getNBAGame(id);
  const getHomeTeamRank = await model.getNBAStandings(
    gameInformation.home_team_id,
  );
  const getAwayTeamRank = await model.getNBAStandings(
    gameInformation.away_team_id,
  );
  const homeWinningRate =
    (parseInt(getHomeTeamRank[0].win, 10) +
      parseInt(getAwayTeamRank[0].lose, 10)) /
    164;
  const homeOdds = (1 / homeWinningRate - 0.3).toFixed(2);
  const awayOdds = (1 / (1 - homeWinningRate) - 0.3).toFixed(2);
  const moneyBuffer = 1000;
  const gameInitialOdds = {
    id,
    homeOdds,
    awayOdds,
    moneyBuffer,
  };
  io.emit('odds', gameInitialOdds);
  await client.set(`odds${id}`, JSON.stringify(gameInitialOdds));
  await model.updateOdds(id, homeOdds, awayOdds, moneyBuffer);
  await model.updateGameOdds(id, homeOdds, awayOdds);
};

export default oddCalculator;

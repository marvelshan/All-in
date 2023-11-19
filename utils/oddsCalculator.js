import * as model from '../model/odds.js';

const gameId = await model.getGameId();
await Promise.all(
  gameId.map(async (id) => {
    const gameInformation = await model.getNBAGame(id.GAME_ID);
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
    const moneyBuffer = 1000;
    await model.insertOdds(
      id.GAME_ID,
      1 / homeWinningRate - 0.3,
      1 / (1 - homeWinningRate) - 0.3,
      moneyBuffer,
    );
  }),
);
// await model.insertOdds(gameInformation.id, odds.team1, odds.team2, moneyBuffer);

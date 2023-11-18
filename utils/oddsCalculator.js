import * as model from '../model/odds.js';

// 測試版故先拿一筆資料測試
const gameId = 22200002;

const gameInformation = await model.getNBAGame(gameId);

const getHomeTeamRank = await model.getNBAStandings(
  gameInformation.home_team_id,
);
const getAwayTeamRank = await model.getNBAStandings(
  gameInformation.away_team_id,
);
const homeWinningRate = getHomeTeamRank[0].win / 82;
const awayWinningRate = getAwayTeamRank[0].win / 82;
const moneyBuffer = 1000;
console.log(1 / homeWinningRate, 1 / awayWinningRate, moneyBuffer);
// await model.insertOdds(gameInformation.id, odds.team1, odds.team2, moneyBuffer);

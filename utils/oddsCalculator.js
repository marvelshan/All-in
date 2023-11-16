import * as model from '../model/odds.js';

function calculateOdds(team1Rank, team2Rank) {
  // 計算兩隊之間的排名差距
  const rankDifference = Math.abs(team1Rank - team2Rank);

  // 基本賠率（可根據實際需求進行調整）
  const baseOdds = 1.0;
  const transformedDifference = Math.sqrt(rankDifference);
  // 根據排名差距調整賠率
  //   const adjustedOdds = baseOdds + 0.1 * rankDifference;
  const oddsTeam1 = 1 + baseOdds / Math.exp(0.3 * transformedDifference);
  const oddsTeam2 = baseOdds * Math.exp(0.3 * transformedDifference);
  // 限制賠率在一個合理的範圍內

  return {
    team1: parseFloat(oddsTeam1.toFixed(2)),
    team2: parseFloat(oddsTeam2.toFixed(2)),
  };
}

// 測試版故先拿一筆資料測試
const gameId = 22200001;

const gameInformation = await model.getNBAGame(gameId);
const getHomeTeamRank = await model.getNBAStandings(
  gameInformation.home_team_id
);
const getAwayTeamRank = await model.getNBAStandings(
  gameInformation.away_team_id
);
const team1Rank = getHomeTeamRank[0].id;
const team2Rank = getAwayTeamRank[0].id;

const odds = calculateOdds(team1Rank, team2Rank);
const moneyBuffer = 1000;
await model.insertOdds(gameInformation.id, odds.team1, odds.team2, moneyBuffer);

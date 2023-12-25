import pool from '../utils/databasePool.js';

export const getBetPointOdds = async () => {
  try {
    const result = await pool.query(
      `SELECT
          bet_for_admin.GAME_ID,
          bet_for_admin.host,
          SUM(bet_for_admin.betting_point * bet_for_admin.betting_odds) AS sum,
          NBA_game.home_team_id,
          NBA_game.away_team_id
      FROM
          bet_for_admin
      JOIN
          NBA_game ON bet_for_admin.GAME_ID = NBA_game.GAME_ID
      GROUP BY
          bet_for_admin.GAME_ID, bet_for_admin.host, NBA_game.home_team_id, NBA_game.away_team_id
      ORDER BY
          bet_for_admin.GAME_ID;`,
    );
    return result[0];
  } catch (error) {
    console.log(`getBetPointOdds model is ${error}`);
    return error;
  }
};

export const getBetNumberPerGame = async () => {
  try {
    const result = await pool.query(
      `SELECT
        bet_for_admin.GAME_ID,
        bet_for_admin.host,
        COUNT(bet_for_admin.GAME_ID) AS count,
        NBA_game.home_team_id,
        NBA_game.away_team_id
      FROM
          bet_for_admin
      JOIN
          NBA_game ON bet_for_admin.GAME_ID = NBA_game.GAME_ID
      GROUP BY
          bet_for_admin.GAME_ID, bet_for_admin.host, NBA_game.home_team_id, NBA_game.away_team_id
      ORDER BY
          bet_for_admin.GAME_ID;`,
    );
    return result[0];
  } catch (error) {
    console.log(`getBetNumberPerGame model is ${error}`);
    return error;
  }
};

export const getBetMoney = async () => {
  try {
    const result = await pool.query(
      'SELECT GAME_ID, host, SUM(betting_point) as money FROM bet_for_admin GROUP BY GAME_ID, host ORDER By GAME_ID',
    );
    return result[0];
  } catch (error) {
    console.log(`getBetMoney model is ${error}`);
    return error;
  }
};

import pool from '../utils/databasePool.js';

export const getBetPointOdds = async () => {
  try {
    const result = await pool.query(
      'SELECT GAME_ID, host, SUM(betting_point * betting_odds) AS sum FROM bet_for_admin GROUP BY GAME_ID, host ORDER By GAME_ID;',
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
      'SELECT GAME_ID, host, COUNT(GAME_ID) AS count FROM bet_for_admin GROUP BY GAME_ID, host ORDER By GAME_ID;',
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

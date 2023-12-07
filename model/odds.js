import pool from '../utils/databasePool.js';

export const getNBAGame = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM NBA_Game where GAME_ID = ?',
      [id],
    );
    return result[0][0];
  } catch (error) {
    console.log(`getNBAGame model is ${error}`);
  }
};

export const getNBAStandings = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM NBA_standing where TEAM_ID = ?',
      [id],
    );
    return result[0];
  } catch (error) {
    console.log(`getNBAStandings model is ${error}`);
  }
};

export const insertOdds = async (id, homeOdds, awayOdds, moneyBuffer) => {
  try {
    const result = await pool.query(
      'INSERT INTO odds (id, home_odds, away_odds, moneyBuffer) VALUES (?,?,?,?)',
      [id, homeOdds, awayOdds, moneyBuffer],
    );
    return result[0];
  } catch (error) {
    console.log(`insertOdds model is ${error}`);
  }
};

export const updateOdds = async (id, homeOdds, awayOdds, moneyBuffer) => {
  try {
    const result = await pool.query(
      'UPDATE odds SET home_odds = ?, away_odds = ?, moneyBuffer = ? WHERE id = ?',
      [homeOdds, awayOdds, moneyBuffer, id],
    );
    return result[0];
  } catch (error) {
    console.log(`insertOdds model is ${error}`);
  }
};

export const getOdds = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM odds where id = ?', [id]);
    return result[0][0];
  } catch (error) {
    console.log(`getOdds model is ${error}`);
  }
};

export const getGameId = async () => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT GAME_ID FROM NBA_game_log',
    );
    return result[0];
  } catch (error) {
    console.log(`getGameId model is error on ${error}`);
  }
};

import pool from './databasePool.js';

export const getNBAGame = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM NBA_Game where id = ?', [
      id,
    ]);
    return result[0][0];
  } catch (error) {
    console.log(`getNBAGame model is ${error}`);
  }
};

export const getNBAStandings = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM NBA_standing where TEAM_ID = ?',
      [id]
    );
    return result[0];
  } catch (error) {
    console.log(`getNBAStandings model is ${error}`);
  }
};

export const insertOdds = async (id, home_odds, away_odds, moneyBuffer) => {
  try {
    const result = await pool.query(
      'INSERT INTO odds (id, home_odds, away_odds, moneyBuffer) VALUES (?,?,?,?)',
      [id, home_odds, away_odds, moneyBuffer]
    );
    return result[0];
  } catch (error) {
    console.log(`insertOdds model is ${error}`);
  }
};

export const updateOdds = async (id, home_odds, away_odds, moneyBuffer) => {
  try {
    const result = await pool.query(
      'UPDATE odds SET home_odds = ?, away_odds = ?, moneyBuffer = ? WHERE id = ?',
      [home_odds, away_odds, moneyBuffer, id]
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

import pool from '../utils/databasePool.js';

export const getNBAGame = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM NBA_game where GAME_ID = ?',
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
      `INSERT INTO odds (id, home_odds, away_odds, moneyBuffer) 
      VALUES (?, ?, ?, ?) 
      ON DUPLICATE KEY UPDATE 
      home_odds = VALUES(home_odds), 
      away_odds = VALUES(away_odds), 
      moneyBuffer = VALUES(moneyBuffer);`,
      [id, homeOdds, awayOdds, moneyBuffer],
    );
    return result[0];
  } catch (error) {
    console.log(`updateOdds model is ${error}`);
  }
};

export const updateGameOdds = async (id, homeOdds, awayOdds) => {
  try {
    const result = await pool.query(
      'UPDATE NBA_game SET home_odds = ?, away_odds = ? WHERE GAME_ID = ?',
      [homeOdds, awayOdds, id],
    );
    return result[0];
  } catch (error) {
    console.log(`updateGameOdds model is ${error}`);
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

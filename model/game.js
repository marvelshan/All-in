import pool from '../utils/databasePool.js';

export const getNBAGameLog = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM NBA_game_log WHERE GAME_ID = ?',
      [id],
    );
    return result[0];
  } catch (error) {
    console.log(`getNBAGameLog model is ${error}`);
    return error;
  }
};

export const insertRealtimeEvent = async (event) => {
  try {
    const result = await pool.query('UPDATE NBA_game_event SET event = ?', [
      event,
    ]);
    return result[0];
  } catch (error) {
    console.log(`insertRealtimeEvent model is ${error}`);
    return error;
  }
};

export const getGameTeamName = async (id) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT NBA_game_log.tid, NBA_TEAM.TEAM_ABBR
      FROM NBA_game_log 
      JOIN NBA_TEAM ON NBA_game_log.tid = NBA_TEAM.TEAM_ID
      WHERE NBA_game_log.GAME_ID = ?;`,
      [id],
    );
    return result[0];
  } catch (error) {
    console.log(`getGameTeamName model is ${error}`);
    return error;
  }
};

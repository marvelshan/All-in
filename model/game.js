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
      'SELECT * FROM NBA_Game WHERE GAME_ID = ?;',
      [id],
    );
    return result[0];
  } catch (error) {
    console.log(`getGameTeamName model is ${error}`);
    return error;
  }
};

export const getAllGame = async () => {
  try {
    const result = await pool.query('SELECT * FROM NBA_Game');
    return result[0];
  } catch (error) {
    console.log(`getAllGame model is ${error}`);
    return error;
  }
};

export const changeGameStatus = async (id, status) => {
  try {
    const result = await pool.query(
      'UPDATE NBA_Game SET status = ? WHERE GAME_ID = ?',
      [status, id],
    );
    return result[0];
  } catch (error) {
    console.log(`changeGameStatus model is ${error}`);
    return error;
  }
};

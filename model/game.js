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

export const getRealtimeEvent = async () => {
  try {
    const result = await pool.query('SELECT * FROM NBA_game_event');
    return result[0][0];
  } catch (error) {
    console.log(`getRealtimeEvent model is ${error}`);
    return error;
  }
};

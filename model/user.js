import pool from '../utils/databasePool.js';

export const createUser = async (name, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO member (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
    );
    return result[0].insertId;
  } catch (error) {
    console.log(`model createUser is error on ${error}`);
  }
};

export const findUser = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM member WHERE email = ?', [
      email,
    ]);
    return result[0][0];
  } catch (error) {
    console.log(`model findUser is error on ${error}`);
  }
};

export const changeUserPoint = async (betPoint, userId) => {
  try {
    const result = await pool.query(
      'UPDATE member SET point = point - ? WHERE id = ?',
      [betPoint, userId],
    );
    return result[0];
  } catch (error) {
    console.log(`model changeUserPoint is error on ${error}`);
  }
};

export const getUserBetInformation = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bet JOIN NBA_Game ON bet.GAME_ID = NBA_Game.GAME_ID WHERE member_id = ?;',
      [userId],
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserBetInformation is error on ${error}`);
  }
};

export const getUserBetGameEnd = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bet_for_admin JOIN NBA_Game ON bet_for_admin.GAME_ID = NBA_Game.GAME_ID WHERE member_id = ? ORDER BY id DESC;',
      [userId],
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserBetInformation is error on ${error}`);
  }
};

export const getUserInformation = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM member WHERE id = ?', [
      userId,
    ]);
    return result[0];
  } catch (error) {
    console.log(`model getUserInformation is error on ${error}`);
  }
};

export const insertUserPerBet = async (userId, id, betPoint, odds, host) => {
  try {
    const result1 = await pool.query(
      'INSERT INTO bet (member_id, GAME_ID, betting_point, betting_odds, host) VALUES (?,?,?,?,?)',
      [userId, id, betPoint, odds, host],
    );

    await pool.query(
      'INSERT INTO bet_for_admin (member_id, GAME_ID, betting_point, betting_odds, host) VALUES (?,?,?,?,?)',
      [userId, id, betPoint, odds, host],
    );
    return result1[0][0];
  } catch (error) {
    console.log(`model insertUserPerBet is error on ${error}`);
  }
};

export const updateUserPerBetResult = async (id, host) => {
  try {
    const result = await pool.query(
      'UPDATE bet_for_admin SET result = 1 WHERE GAME_ID = ? AND host = ?',
      [id, host],
    );
    return result[0][0];
  } catch (error) {
    console.log(`model updateUserPerBetResult is error on ${error}`);
  }
};

export const updateLoseBetResult = async (id, host) => {
  try {
    const result = await pool.query(
      'UPDATE bet_for_admin SET result = 2 WHERE GAME_ID = ? AND host = ?',
      [id, host],
    );
    return result[0][0];
  } catch (error) {
    console.log(`model updateLoseBetResult is error on ${error}`);
  }
};

export const selectWinUser = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bet WHERE GAME_ID = ? AND result = 1',
      [id],
    );
    return result[0];
  } catch (error) {
    console.log(`model selectWinUser is error on ${error}`);
  }
};

export const deleteBetInfor = async (id) => {
  try {
    const result = await pool.query('DELETE FROM bet WHERE GAME_ID = ?', [id]);
    return result[0];
  } catch (error) {
    console.log(`model deleteBetInfor is error on ${error}`);
  }
};

export const insertUserMessage = async (userId, name, message, id) => {
  try {
    const result = await pool.query(
      'INSERT INTO message (member_id, userName, message, GAME_ID) VALUES (?,?,?,?)',
      [userId, name, message, id],
    );
    return result[0];
  } catch (error) {
    console.log(`model insertUserMessage is error on ${error}`);
  }
};
export const getChatroomMessage = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM message WHERE GAME_ID = ?', [
      id,
    ]);
    return result[0];
  } catch (error) {
    console.log(`model getChatroomMessage is error on ${error}`);
  }
};

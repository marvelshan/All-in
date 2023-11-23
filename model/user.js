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
      `SELECT bet.*
      FROM bet
      JOIN member ON bet.member_id = member.id
      WHERE bet.member_id = ? AND member.id = ?;`,
      [userId, userId],
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserBetInformation is error on ${error}`);
  }
};

export const getUserInformation = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM member WHERE id = ?;', [
      userId,
    ]);
    return result[0];
  } catch (error) {
    console.log(`model getUserInformation is error on ${error}`);
  }
};

export const insertUserPerBet = async (userId, id, betPoint, odds, host) => {
  try {
    const result = await pool.query(
      'INSERT INTO bet (member_id, GAME_ID, betting_point, betting_odds, host) VALUES (?,?,?,?,?)',
      [userId, id, betPoint, odds, host],
    );
    return result[0][0];
  } catch (error) {
    console.log(`model insertUserPerBet is error on ${error}`);
  }
};

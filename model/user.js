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

export const getUserInformation = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM member WHERE id = ?', [
      userId,
    ]);
    return result[0][0];
  } catch (error) {
    console.log(`model checkUserPoint is error on ${error}`);
  }
};

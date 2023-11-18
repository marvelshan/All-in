import pool from './databasePool.js';

export const createUser = async (name, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO member (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
    );
    return result[0].insertId;
  } catch (error) {
    console.log(`model signup is error on ${error}`);
  }
};

export const findUser = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM member WHERE email = ?', [
      email,
    ]);
    return result[0][0];
  } catch (error) {
    console.log(`model checksignup is error on ${error}`);
  }
};

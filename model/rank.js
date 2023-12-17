import pool from '../utils/databasePool.js';

export const getUserPointRank = async () => {
  try {
    const result = await pool.query(
      'SELECT `name`, `point`, oldRank, ROW_NUMBER() OVER (ORDER BY `point` DESC) AS newRank FROM `member`',
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserPointRank is error on${error}`);
  }
};

export const getNewPointRank = async () => {
  try {
    const result = await pool.query(
      'SELECT `id`, ROW_NUMBER() OVER (ORDER BY `point` DESC) AS ranking FROM `member`',
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserPointRank is error on${error}`);
  }
};

export const getIdPointRank = async () => {
  try {
    const result = await pool.query('SELECT `id`, `rank` FROM `member`');
    return result[0];
  } catch (error) {
    console.log(`model getIdPointRank is error on${error}`);
  }
};

export const updateOldPointRank = async (id, rank) => {
  try {
    const result = await pool.query(
      'UPDATE member SET oldRank = ? WHERE id = ?',
      [rank, id],
    );
    return result[0];
  } catch (error) {
    console.log(`model updateOldPointRank is error on${error}`);
  }
};

export const updateNewPointRank = async (id, rank) => {
  try {
    const result = await pool.query(
      'UPDATE member SET `rank` = ? WHERE id = ?',
      [rank, id],
    );
    return result[0];
  } catch (error) {
    console.log(`model updateNewPointRank is error on${error}`);
  }
};

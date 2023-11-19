import pool from '../utils/databasePool.js';

export const getUserPointRank = async () => {
  try {
    const result = await pool.query(
      'SELECT `name`, `point` FROM `member` ORDER BY POINT DESC',
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserPointRank is error on${error}`);
  }
};

export const getUserWinningRateRank = async () => {
  try {
    const result = await pool.query(
      'SELECT `name`, `winningRate` FROM `member` ORDER BY winningRate DESC',
    );
    return result[0];
  } catch (error) {
    console.log(`model getUserPointRank is error on${error}`);
  }
};

import pool from '../utils/databasePool.js';

const topUpPoint = async (point, id) => {
  try {
    const result = await pool.query(
      'UPDATE member SET point = point + ? WHERE id = ?',
      [point, id],
    );
    return result[0];
  } catch (error) {
    console.log(`NBA standing model is ${error}`);
  }
};

export default topUpPoint;

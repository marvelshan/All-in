import * as model from '../model/rank.js';

export const getUserPointRank = async (req, res) => {
  try {
    const pointRank = await model.getUserPointRank();
    return res.status(200).json(pointRank);
  } catch (error) {
    console.log(`controller getUserPointRank error on ${error}`);
  }
};

export const getUserWinningRateRank = async (req, res) => {
  try {
    const winningRateRank = await model.getUserWinningRateRank();
    res.status(200).json(winningRateRank);
  } catch (error) {
    console.log(`controller getUserWinningRateRank error on ${error}`);
  }
};

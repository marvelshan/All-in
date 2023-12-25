import { CronJob } from 'cron';
import * as model from '../model/rank.js';

export const getUserPointRank = async (req, res) => {
  try {
    const pointRank = await model.getUserPointRank();
    return res.status(200).json(pointRank);
  } catch (error) {
    console.log(`controller getUserPointRank error on ${error}`);
  }
};

export default getUserPointRank;

const updateOldPointRank = async () => {
  try {
    const oldRank = await model.getIdPointRank();
    oldRank.forEach(async (userInfor) => {
      await model.updateOldPointRank(userInfor.id, userInfor.rank);
    });
  } catch (error) {
    console.log(`controller updatePointRank error on ${error}`);
  }
};

const updateNewPointRank = async () => {
  try {
    const newRank = await model.getNewPointRank();
    newRank.forEach(async (userInfor) => {
      await model.updateNewPointRank(userInfor.id, userInfor.ranking);
    });
  } catch (error) {
    console.log(`controller updatePointRank error on ${error}`);
  }
};

try {
  const rankCronJob = new CronJob(
    '59 12 * * 7',
    async () => {
      updateOldPointRank();
      updateNewPointRank();
    },
    null,
    false,
    'Asia/Taipei',
  );
  rankCronJob.start();
} catch (error) {
  console.log(`cronjob set week rank controller error on ${error}`);
}

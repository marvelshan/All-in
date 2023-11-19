import express from 'express';
import {
  getUserPointRank,
  getUserWinningRateRank,
} from '../controller/rank.js';

const router = express.Router();

router.get(
  '/pointRank',
  /* #swagger.tags = ['Rank']
    #swagger.description = 'Endpoint to rank point' */

  /* #swagger.responses[200] = {
    schema:[
      {
        "name": "test1",
        "point": 111150
      },
      {
        "name": "test5",
        "point": 83240
      }
    ]} */
  getUserPointRank,
);
router.get(
  '/winningRateRank',
  /* #swagger.tags = ['Rank']
    #swagger.description = 'Endpoint to rank winning rate' */

  /* #swagger.responses[200] = {
    schema:[
      {
        "name": "test1",
        "winningRate": "0.80"
      },
      {
        "name": "test5",
        "winningRate": "0.72"
      }
    ]} */
  getUserWinningRateRank,
);

export default router;

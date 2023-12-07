import express from 'express';
import {
  getUserPointRank,
  getUserWinningRateRank,
} from '../controller/rank.js';

const router = express.Router();

router.get('/pointRank', getUserPointRank);
router.get('/winningRateRank', getUserWinningRateRank);

export default router;

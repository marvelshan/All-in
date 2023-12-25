import express from 'express';
import { getUserPointRank } from '../controller/rank.js';

const router = express.Router();

router.get('/pointRank', getUserPointRank);

export default router;

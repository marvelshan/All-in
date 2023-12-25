import express from 'express';
import * as odds from '../controller/odds.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/bet', authenticate, odds.recordUserBet);

router.post('/getOdds', odds.getOdds);

export default router;

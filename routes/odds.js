import express from 'express';
import * as odds from '../controller/odds.js';
import * as user from '../controller/user.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/bet',
  authenticate,
  user.checkUserPoint,
  odds.oddsManipulator,
  odds.changeUserPoint,
  user.recordPerBet,
);

router.post('/getOdds', odds.getOdds);

export default router;

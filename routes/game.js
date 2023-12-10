import express from 'express';
import * as game from '../controller/game.js';
import oddCalculator from '../controller/oddsCalculator.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/start',
  authenticate,
  authorizeAdmin,
  oddCalculator,
  game.startGameEvent,
);

router.post('/schedule', authenticate, authorizeAdmin, game.schedule);

router.post(
  '/getGameEvent',
  authenticate,
  authorizeAdmin,
  game.putGameEventInRedis,
);

router.get('/infor', authenticate, authorizeAdmin, game.getAllGame);

export default router;

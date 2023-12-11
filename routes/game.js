import express from 'express';
import * as game from '../controller/game.js';
import oddCalculator from '../controller/oddsCalculator.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/start', oddCalculator, game.startGameEvent);

router.post(
  '/schedule',
  authenticate,
  authorizeAdmin,
  oddCalculator,
  game.cleanGameEvent,
  game.schedule,
);

router.post('/getGameEvent', game.putGameEventInRedis);

router.get('/infor', game.getAllGame);

export default router;

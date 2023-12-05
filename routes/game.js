import express from 'express';
import * as game from '../controller/game.js';
import oddCalculator from '../controller/oddsCalculator.js';

const router = express.Router();

router.post('/start', oddCalculator, game.startGameEventInRedis);

router.post('/getGameEvent', game.putGameEventInRedis);

export default router;

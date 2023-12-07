import express from 'express';
import * as game from '../controller/game.js';
import oddCalculator from '../controller/oddsCalculator.js';

const router = express.Router();

router.post('/start', oddCalculator, game.startGameEvent);

router.post('/getGameEvent', game.putGameEventInRedis);

router.get('/infor', game.getAllGame);

export default router;

import express from 'express';
import * as model from '../controller/game.js';
import oddCalculator from '../controller/oddsCalculator.js';

const router = express.Router();

router.post('/start', oddCalculator, model.startGameEventInRedis);

router.post('/getGameEvent', model.putGameEventInRedis);

export default router;

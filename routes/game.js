import express from 'express';
import * as game from '../controller/game.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/start', game.startGameEvent);

router.post('/schedule', authenticate, authorizeAdmin, game.schedule);

router.post('/getGameEvent', game.putGameEventInRedis);

router.get('/infor', game.getAllGame);

router.post('/status', game.getGameStatus);

export default router;

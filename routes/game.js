import express from 'express';
import getGameEvent from '../controller/game.js';

const router = express.Router();

router.post('/', getGameEvent);

export default router;

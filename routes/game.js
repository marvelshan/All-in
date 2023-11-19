import express from 'express';
import getGameEvent from '../controller/game.js';

const router = express.Router();

router.post(
  '/',
  // #swagger.ignore = true
  getGameEvent,
);

export default router;

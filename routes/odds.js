import express from 'express';
import oddsManipulator from '../controller/oddsManipulator.js';

const router = express.Router();

router.post('/', oddsManipulator);

export default router;

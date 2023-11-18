import express from 'express';
import { sendTappay } from '../controller/charge.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, sendTappay);

export default router;

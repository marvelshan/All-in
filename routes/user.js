import express from 'express';
import * as user from '../controller/user.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signIn', user.signIn);

router.post('/signUp', user.signUp);

router.post('/getUserInfor', authenticate, user.getUserInfor);

router.post('/record', authenticate, user.getUserBetGameEnd);

router.post('/message', authenticate, user.insertUserMessage);

router.post('/chatRoom', user.getChatroomMessage);

export default router;

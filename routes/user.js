import express from 'express';
import * as user from '../controller/user.js';
import jwtoperator from '../middleware/signJWT.js';

const router = express.Router();

router.post('/signIn', user.signIn, jwtoperator);
router.post('/signUp', user.checkEmailType, user.signUp, jwtoperator);

export default router;

import express from 'express';
import * as admin from '../controller/admin.js';
import authenticate from '../middleware/authenticate.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';

const router = express.Router();

router.get('/payment', admin.getBetPointOdds);

router.get('/number', admin.getBetNumberPerGame);

router.get('/money', admin.getBetMoney);

router.get('', authenticate, authorizeAdmin, admin.toAdminPage);

export default router;

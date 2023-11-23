import express from 'express';
import * as odds from '../controller/odds.js';
import * as user from '../controller/user.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/bet',
  /* #swagger.tags = ['Odds']
    #swagger.description = 'Endpoint to Odds'
      #swagger.security = [{
      "JWT": []
    ]} */

  /* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'User information.',
    required: true,
    schema: {
        "id": "22200001",
        "point": 1000,
        "hosting": "home"
    }} */

  /* #swagger.responses[200] = {
    schema:{
      "data": "successful insertion"
    }} */

  authenticate,
  user.checkUserPoint,
  odds.oddsManipulator,
  odds.changeUserPoint,
  user.recordPerBet,
);

router.post('/getOdds', odds.getOdds);

export default router;

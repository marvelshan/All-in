import express from 'express';
import oddsManipulator from '../controller/oddsManipulator.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/',
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
  oddsManipulator,
);

export default router;

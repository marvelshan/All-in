import express from 'express';
import { sendTappay } from '../controller/charge.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/',
  /* #swagger.tags = ['Tappay']
    #swagger.description = 'Endpoint to Tappay'
      #swagger.security = [{
      "JWT": []
   }] */

  /* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'User information.',
    required: true,
    schema: {
        "id": 1,
        "prime": "sdhafuh56451snj4564x.dafij;we",
        "name": "test",
        "email": "test@test.com",
        "point": "30000",
    }} */

  /* #swagger.responses[200] = {
    schema:{
      "data": "success top up"
    }} */
  authenticate,
  sendTappay,
);

export default router;

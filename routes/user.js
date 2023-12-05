import express from 'express';
import * as user from '../controller/user.js';
import jwtoperator from '../middleware/signJWT.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post(
  '/signIn',
  /* #swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in' */

  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: {
                "email": "any@any.com",
                "password": "any"
            }
    } */

  /* #swagger.responses[200] = {
    schema:{
        "data": {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          "accessExpired": 60,
          "user": {
              "id": 1,
              "name": "test1",
              "email": "test@test.com"
          }
        }
      }} */
  user.signIn,
  jwtoperator,
);
router.post(
  '/signUp',
  /* #swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign up a specific user' */

  /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: {
                "name": "any",
                "email": "any@any.com",
                "password": "any"
            }
    } */

  /* #swagger.responses[200] = {
    schema:{
        "data": "new user Id is 99"
    }} */
  user.checkEmailType,
  user.signUp,
  jwtoperator,
);

router.post('/getUserInfor', authenticate, user.getUserInfor);

router.post('/record', authenticate, user.getUserBetGameEnd);

export default router;

import jwt from 'jsonwebtoken';
import * as model from '../model/user.js';

const authenticate = async (req, res, next) => {
  console.time('Authorization');
  try {
    console.time('authenticate');
    const tokenInHeaders = req.get('Authorization');
    const token =
      tokenInHeaders?.replace('Bearer ', '') || req.cookies.jwtToken;
    if (!token) {
      res.status(401).json({ errors: 'invalid token' });
      return;
    }
    console.log(req.cookies.jwtToken);
    const privateKey = process.env.JWT_KEY;
    console.timeEnd('Authorization');
    console.time('JWTverify');
    try {
      const userInformation = jwt.verify(token, privateKey);
      const { userId, name, email } = userInformation.user;
      req.body = {
        ...req.body,
        userId,
        name,
        email,
      };
    } catch (error) {
      return res.status(403).send('wrong token');
    }
    console.timeEnd('JWTverify');
    console.time('findUser');
    try {
      // check later
      await model.findUser(req.body.email);
    } catch (error) {
      return res.status(403).send('wrong account');
    }
    console.timeEnd('findUser');
    console.timeEnd('authenticate');
    next();
  } catch (error) {
    res.status(500).send(`middleware authenticate is error on ${error}`);
  }
};

export default authenticate;

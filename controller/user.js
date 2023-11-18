import bcrypt from 'bcrypt';
import * as model from '../model/user.js';

export const checkEmailType = async (req, res, next) => {
  try {
    const { email } = req.body;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mailFormat = /\S+@\S+\.\S+/;
    if (!email.match(mailFormat) || !pattern.test(email)) {
      return res.status(404).send('User type error email');
    }
    next();
  } catch (error) {
    console.log(`controller checksignup:${error}`);
    res.status(500);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await model.findUser(email);
    if (checkUser.length >= 1) {
      return res.status(404).send('User already sign up');
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userId = await model.createUser(name, email, hashPassword);
    res.status(200).send(`new user Id is ${userId}`);
    next();
  } catch (error) {
    console.log(`controller signUp error on ${error}`);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await model.findUser(email);
    if (checkUser.length === 0) {
      res.status(404).send('User does not sign up');
    }
    req.body.id = checkUser.id;
    req.body.name = checkUser.name;
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (checkPassword !== true) {
      return res.status(400).send('password is incorrect');
    }
    next();
  } catch (error) {
    console.log(`controller signIn error on ${error}`);
  }
};

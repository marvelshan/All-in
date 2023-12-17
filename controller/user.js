import bcrypt from 'bcrypt';
import * as model from '../model/user.js';
import { getBetPointOdds } from '../model/admin.js';
import { io } from '../utils/socket.js';

export const checkEmailType = async (req, res, next) => {
  try {
    const { email } = req.body;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mailFormat = /\S+@\S+\.\S+/;
    if (!email.match(mailFormat) || !pattern.test(email)) {
      return res.status(404).json({
        success: false,
        message: 'User type error email',
      });
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
    if (checkUser !== undefined) {
      return res.status(404).json({
        success: false,
        message: 'This account already sign up before',
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userId = await model.createUser(name, email, hashPassword);
    req.body.userId = userId;
    next();
  } catch (error) {
    console.log(`controller signUp error on ${error}`);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await model.findUser(email);
    if (checkUser === undefined) {
      return res.status(404).json({
        success: false,
        message: 'User does not sign up',
      });
    }
    req.body.userId = checkUser.id;
    req.body.name = checkUser.name;
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (checkPassword !== true) {
      return res.status(400).json({
        success: false,
        message: 'password is incorrect',
      });
    }
    next();
  } catch (error) {
    console.log(`controller signIn error on ${error}`);
  }
};

export const checkUserPoint = async (req, res, next) => {
  try {
    // console.time('checkUserPoint');
    const { userId, betPoint } = req.body;
    const userPoint = await model.getUserInformation(userId);
    if (betPoint > userPoint[0].point) {
      return res.status(404).json({
        success: false,
        message: 'User do not have enough point',
      });
    }
    // console.timeEnd('checkUserPoint');
    next();
  } catch (error) {
    console.log(`controller checkUserPoint error on ${error}`);
  }
};

export const getUserInfor = async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfor = await model.getUserInformation(userId);
    const betInfor = await model.getUserBetInformation(userId);
    const data = { userInfor, betInfor };
    res.status(200).json(data);
  } catch (error) {
    console.log(`controller getUserInfor error on ${error}`);
  }
};

export const getUserBetGameEnd = async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfor = await model.getUserInformation(userId);
    const betInfor = await model.getUserBetGameEnd(userId);
    const data = { userInfor, betInfor };
    res.status(200).json(data);
  } catch (error) {
    console.log(`controller getUserBetGameEnd error on ${error}`);
  }
};

export const recordPerBet = async (req, res, next) => {
  try {
    // console.time('recordPerBet');
    const { id, betPoint, userId, odds, hosting } = req.body;
    model.insertUserPerBet(userId, id, betPoint, odds, hosting);
    // console.timeEnd('recordPerBet');
    next();
  } catch (error) {
    console.log(`controller recordPerBet error on ${error}`);
  }
};

export const sendLatestInfor = async (req, res) => {
  try {
    const barInfor = await getBetPointOdds();
    io.emit('barChart', barInfor);
    res.status(200).send({ success: true, message: 'Betted successfully' });
  } catch (error) {
    console.log(`controller sendLatestInfor error on ${error}`);
  }
};

export const insertUserMessage = async (req, res) => {
  try {
    const { userId, name, message, betPoint, id } = req.body;
    if (message === undefined) {
      const betMessage = `${name}下注${betPoint}`;
      await model.insertUserMessage(userId, null, betMessage, id);
      const data = { userId, message: betMessage, id };
      io.emit(`message${id}`, data);
    } else {
      await model.insertUserMessage(userId, name, message, id);
      const data = { userId, name, message, id };
      io.emit(`message${id}`, data);
    }
    res.status(200).json({
      success: true,
      message: 'Message is successfully send',
    });
  } catch (error) {
    console.log(`controller insertUserMessage error on ${error}`);
  }
};

export const getChatroomMessage = async (req, res) => {
  try {
    const { id } = req.body;
    const allMessage = await model.getChatroomMessage(id);
    res.status(200).json(allMessage);
  } catch (error) {
    console.log(`controller getChatroomMessage error on ${error}`);
  }
};

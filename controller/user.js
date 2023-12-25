import bcrypt from 'bcrypt';
import * as model from '../model/user.js';
import { io } from '../utils/socket.js';
import jwtoperator from '../middleware/signJWT.js';

export const checkEmailType = async (email, res) => {
  try {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mailFormat = /\S+@\S+\.\S+/;
    if (!email.match(mailFormat) || !pattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'User type error email',
      });
    }
  } catch (error) {
    console.log(`controller checksignup:${error}`);
    res.status(500);
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await checkEmailType(email, res);
    const checkUser = await model.findUser(email);
    if (checkUser !== undefined) {
      return res.status(400).json({
        success: false,
        message: 'This account already sign up before',
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userId = await model.createUser(name, email, hashPassword);
    req.body.userId = userId;
    await jwtoperator(userId, name, email, res);
  } catch (error) {
    console.log(`controller signUp error on ${error}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await model.findUser(email);
    if (checkUser === undefined) {
      return res.status(400).json({
        success: false,
        message: 'User does not sign up',
      });
    }
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (checkPassword !== true) {
      return res.status(400).json({
        success: false,
        message: 'password is incorrect',
      });
    }
    await jwtoperator(checkUser.id, checkUser.name, email, res);
  } catch (error) {
    console.log(`controller signIn error on ${error}`);
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

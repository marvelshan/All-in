import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as model from '../model/admin.js';

export const getBetPointOdds = async (req, res) => {
  try {
    const betInfor = await model.getBetPointOdds();
    return res.status(200).json(betInfor);
  } catch (error) {
    console.log(`controller getBetPointOdds error on ${error}`);
  }
};

export const getBetNumberPerGame = async (req, res) => {
  try {
    const betInfor = await model.getBetNumberPerGame();
    return res.status(200).json(betInfor);
  } catch (error) {
    console.log(`controller getBetNumberPerGame error on ${error}`);
  }
};

export const getBetMoney = async (req, res) => {
  try {
    const betInfor = await model.getBetMoney();
    return res.status(200).json(betInfor);
  } catch (error) {
    console.log(`controller getBetMoney error on ${error}`);
  }
};

export const toAdminPage = async (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const adminPagePath = join(currentDir, '..', 'public', 'admin.html');
  res.sendFile(adminPagePath);
};

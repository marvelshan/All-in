import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('/', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const adminPagePath = join(currentDir, '..', 'public', 'home.html');
  res.sendFile(adminPagePath);
});

router.get('/profile', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const profilePagePath = join(currentDir, '..', 'public', 'profile.html');
  res.sendFile(profilePagePath);
});

router.get('/rank', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const rankPagePath = join(currentDir, '..', 'public', 'rank.html');
  res.sendFile(rankPagePath);
});

router.get('/charge', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const chargePagePath = join(currentDir, '..', 'public', 'charge.html');
  res.sendFile(chargePagePath);
});

router.get('/record', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const recordPagePath = join(currentDir, '..', 'public', 'record.html');
  res.sendFile(recordPagePath);
});

router.get('/game', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const gamePagePath = join(currentDir, '..', 'public', 'game.html');
  res.sendFile(gamePagePath);
});

export default router;

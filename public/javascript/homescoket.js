import { io } from 'socket.io-client';
const socket = io();
socket.on('connection', () => {
  console.log('connected');
});
socket.emit('event');
let lastEventText = '';
socket.on('gameEvent', (gamePerEvent) => {
  const game = JSON.parse(gamePerEvent);
  if (game.GAME_ID) {
    homeScoreElements[(game.GAME_ID % 10) - 1].textContent = `${game.hs}`;
    awayScoreElements[(game.GAME_ID % 10) - 1].textContent = `${game.vs}`;
  }
  if (game.GAME_ID == gameValue) {
    const currentEventText = game.de;
    if (currentEventText !== lastEventText) {
      const eventElement = document.createElement('div');
      eventElement.textContent = game.de;
      event.insertBefore(eventElement, event.firstChild);
      eventElement.style.color = '#ea7500';
      if (event.children[1]) {
        event.children[1].style.color = 'black';
      }
      if (event.children.length > 5) {
        event.removeChild(event.lastChild);
      }
      homeMainScore.textContent = `${game.hs}`;
      awayMainScore.textContent = `${game.vs}`;
    }
    lastEventText = currentEventText;
  }
});

socket.on('odds', (oddsFromRedis) => {
  const odds = JSON.parse(oddsFromRedis);
  if (odds.id == gameValue) {
    homeOdds.textContent = odds.home_odds;
    awayOdds.textContent = odds.away_odds;
  }
});

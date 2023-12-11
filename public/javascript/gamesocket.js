import { io } from 'socket.io-client';

const socket = io('https://www.ygolonhcet.online/');
socket.on('connection', () => {
  console.log('connected');
});
let lastEventText = '';
socket.on('gameEvent', (game) => {
  if (game.GAME_ID < 22200006) {
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
      homeMainScore.textContent = game.hs;
      awayMainScore.textContent = game.vs;
    }
    lastEventText = currentEventText;
  }
});

socket.on('odds', (odds) => {
  if (odds.id == gameValue) {
    homeOdds.textContent = odds.home_odds;
    awayOdds.textContent = odds.away_odds;
  }
});

const messageContainer = document.querySelector('.messageContainer');
socket.on(`message${gameValue}`, (message) => {
  const ownElement = document.createElement('div');
  if (message.name === userName.textContent) {
    ownElement.className = 'ownElement';
    ownElement.textContent = message.message;
    messageContainer.appendChild(ownElement);
  } else {
    const element = document.createElement('div');
    element.className = 'element';
    element.textContent = `${message.name}: ${message.message}`;
    messageContainer.appendChild(element);
  }
});

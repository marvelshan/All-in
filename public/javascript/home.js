const urlParams = new URLSearchParams(window.location.search);
const gameValue = urlParams.get('game');

document.querySelector('.gameId').textContent = gameValue;
const homeOdds = document.querySelector('.homeOdds');
const homeButton = document.querySelector('.homeButton');

const awayOdds = document.querySelector('.awayOdds');
const awayButton = document.querySelector('.awayButton');

const event = document.querySelector('.eventList');
const teamName = document.querySelectorAll('.teamName');
const homeScoreElements = document.querySelectorAll('.homeScore');
const awayScoreElements = document.querySelectorAll('.awayScore');
const homeMainScore = document.querySelector('.homeMainScore');
const awayMainScore = document.querySelector('.awayMainScore');
const homeMainTeam = document.querySelector('.homeMainTeam');
const awayMainTeam = document.querySelector('.awayMainTeam');

function getOdds() {
  fetch('/odds/getOdds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: gameValue,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        return alert(data.message);
      }
      const gameEvent = JSON.parse(data);
      homeOdds.textContent = gameEvent.home_odds;
      awayOdds.textContent = gameEvent.away_odds;
    });
}
getOdds();
// first get game information
function getGameEvent(gameId) {
  fetch('/game/getGameEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: gameId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((game) => {
      if (game.success === false) {
        return alert(game.message);
      }
      // const game = JSON.parse(data);
      if (game.gameData.GAME_ID) {
        teamName[(game.gameData.GAME_ID % 10) - 1].textContent =
          `${game.gameTeamName[0].TEAM_ABBR} v.s ${game.gameTeamName[1].TEAM_ABBR}`;
        homeScoreElements[(game.gameData.GAME_ID % 10) - 1].textContent =
          ` ${game.gameData.hs}`;
        awayScoreElements[(game.gameData.GAME_ID % 10) - 1].textContent =
          ` ${game.gameData.vs}`;
      }
      if (game.gameData.GAME_ID == gameValue) {
        event.textContent = `event: ${game.gameData.de}`;
        homeMainTeam.textContent = game.gameTeamName[0].TEAM_ABBR;
        awayMainTeam.textContent = game.gameTeamName[1].TEAM_ABBR;
        homeMainScore.textContent = game.gameData.hs;
        awayMainScore.textContent = game.gameData.vs;
      }
    });
}
getGameEvent(gameValue);
getGameEvent('22200001');
getGameEvent('22200002');
getGameEvent('22200003');
getGameEvent('22200004');
getGameEvent('22200005');

function betHomeGame() {
  if (event.textContent === 'event: Game End') {
    return alert(
      'The competition has concluded, and betting is no longer available.',
    );
  }
  const betPoint = document.querySelector('input[name="homeBet"]').value;
  const userPoint = document.querySelector('.userPoint');
  if (betPoint > parseInt(userPoint.textContent)) {
    alert('有錢不賭，愧對父母');
    window.location.href = `/charge.html`;
    return;
  }
  const id = gameValue;
  const hosting = 'home';
  fetch('/odds/bet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, betPoint, hosting }),
  })
    .then((response) => {
      if (response.status === 404) {
        alert('You dont have any point');
      } else if (response.status === 200) {
        alert('User betted successfully');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        return alert(data.message);
      }
      getOdds();
      getUserInfor();
    });
}

function betAwayGame() {
  if (event.textContent === 'event: Game End') {
    return alert(
      'The competition has concluded, and betting is no longer available.',
    );
  }
  const betPoint = document.querySelector('input[name="awayBet"]').value;
  const id = gameValue;
  if (betPoint > parseInt(userPoint.textContent)) {
    alert('有錢不賭，愧對父母');
    window.location.href = `/charge.html`;
    return;
  }
  const hosting = 'away';
  fetch('/odds/bet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, betPoint, hosting }),
  })
    .then((response) => {
      if (response.status === 404) {
        alert('You dont have any point');
      } else if (response.status === 200) {
        alert('User betted successfully');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        return alert(data.message);
      }
      getOdds();
      getUserInfor();
    });
}

// member information
function getUserInfor() {
  const userEmail = document.querySelector('.userEmail');
  const userName = document.querySelector('.userName');
  const userPoint = document.querySelector('.userPoint');
  const container = document.querySelector('.container');

  fetch('/user/getUserInfor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        alert('You should sign in first');
        window.location.href = '/profile.html';
      }
      userEmail.textContent = data.userInfor[0].email;
      userName.textContent = data.userInfor[0].name;
      userPoint.textContent = data.userInfor[0].point;

      container.innerHTML = '';
      data.betInfor.forEach((betData) => {
        const element = document.createElement('div');
        element.classList.add('gamecontainer');
        element.innerHTML = `
        <div class="record-title">Betting Record</div>
        <div class="record-item">GAME ID: ${betData.GAME_ID}</div>
        <div class="record-item">Bet Point: ${betData.betting_point}</div>
        <div class="record-item">Betting Odds: ${betData.betting_odds}</div>
        <div class="record-item">Host: ${betData.host}</div>
    `;
        container.appendChild(element);
      });
    });
}
getUserInfor();

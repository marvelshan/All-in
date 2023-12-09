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
const userName = document.querySelector('.userName');
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
      homeOdds.textContent = gameEvent.homeOdds;
      awayOdds.textContent = gameEvent.awayOdds;
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
      if (game.gameData.GAME_ID < 22200006) {
        teamName[(game.gameData.GAME_ID % 10) - 1].textContent =
          `${game.gameTeamName[0].home_team_id} v.s ${game.gameTeamName[0].away_team_id}`;
        homeScoreElements[(game.gameData.GAME_ID % 10) - 1].textContent =
          ` ${game.gameData.hs}`;
        awayScoreElements[(game.gameData.GAME_ID % 10) - 1].textContent =
          ` ${game.gameData.vs}`;
      }
      if (game.gameData.GAME_ID == gameValue) {
        event.textContent = `event: ${game.gameData.de}`;
        homeMainTeam.textContent = game.gameTeamName[0].home_team_id;
        awayMainTeam.textContent = game.gameTeamName[0].away_team_id;
        homeMainScore.textContent = game.gameData.hs;
        awayMainScore.textContent = game.gameData.vs;

        setTeamImage(game.gameTeamName[0].home_team_id, 'homeTeamMark');
        setTeamImage(game.gameTeamName[0].away_team_id, 'awayTeamMark');
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
    alert('小賭怡情，大賭傷身');
    window.location.href = `/charge.html`;
    return;
  } else if (isNaN(parseInt(betPoint))) {
    alert('Number is the only way to bet');
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
  const userPoint = document.querySelector('.userPoint');
  const id = gameValue;
  if (betPoint > parseInt(userPoint.textContent)) {
    alert('小賭怡情，大賭傷身');
    window.location.href = `/charge.html`;
    return;
  } else if (isNaN(parseInt(betPoint))) {
    alert('Number is the only way to bet');
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
      console.log(data);
      data.betInfor.forEach((betData) => {
        const element = document.createElement('div');
        element.classList.add('gamecontainer');
        console.log(betData);
        element.innerHTML = `
        <div class="record-title">Betting Record</div>
        <div class="record-item">GAME: ${betData.home_team_id} v.s ${betData.away_team_id}</div>
        <div class="record-item">Bet Point: ${betData.betting_point}</div>
        <div class="record-item">Betting Odds: ${betData.betting_odds}</div>
        <div class="record-item">Host: ${betData.host}</div>
    `;
        container.appendChild(element);
      });
    });
}
getUserInfor();

function setTeamImage(team, elementId) {
  const imagePath = `/image/${team}.png`;
  document.getElementById(elementId).style.backgroundImage =
    `url(${imagePath})`;
}

function changeToChatroom() {
  const rightColumn = document.querySelector('.right-column');
  const chatroom = document.querySelector('.chatroom');
  rightColumn.style.display = 'none';
  chatroom.style.display = 'block';
}
function sendMessage() {
  const message = document.querySelector('input[name="message"]');
  fetch('/user/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: gameValue,
      message: message.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((game) => {
      if (game.success === false) {
        return alert(game.message);
      }
    });
  message.value = '';
}
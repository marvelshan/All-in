const userEmail = document.querySelector('.userEmail');
const userName = document.querySelector('.userName');
const userPoint = document.querySelector('.userPoint');
const container = document.querySelector('.container');
fetch('/user/record', {
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
      if (betData.result === 1) {
        const element = document.createElement('div');
        element.classList.add('gamecontainer');
        const winningPoint = parseInt(
          betData.betting_point * betData.betting_odds,
        );
        element.innerHTML = `
            <div class="record-title">Betting Record</div>
            <div class="record-item">GAME: ${betData.home_team_id} v.s ${betData.away_team_id}</div>
            <div class="record-item">Bet Point: ${betData.betting_point}</div>
            <div class="record-item">Betting Odds: ${betData.betting_odds}</div>
            <div class="record-item">Host: ${betData.host}</div>
            <div class="winningPoint">Winning point: ${winningPoint}</div>
        `;
        container.appendChild(element);
      } else if (betData.result === 2) {
        const element = document.createElement('div');
        element.classList.add('gamecontainer');
        element.innerHTML = `
            <div class="record-title">Betting Record</div>
            <div class="record-item">GAME: ${betData.home_team_id} v.s ${betData.away_team_id}</div>
            <div class="record-item">Bet Point: ${betData.betting_point}</div>
            <div class="record-item">Betting Odds: ${betData.betting_odds}</div>
            <div class="record-item">Host: ${betData.host}</div>
            <div class="lose">Sorry you don't get point on this game</div>
        `;
        container.appendChild(element);
      } else if (betData.result === 0) {
        const element = document.createElement('div');
        element.classList.add('gamecontainer');
        element.innerHTML = `
            <div class="record-title">Betting Record</div>
            <div class="record-item">GAME: ${betData.home_team_id} v.s ${betData.away_team_id}</div>
            <div class="record-item">Bet Point: ${betData.betting_point}</div>
            <div class="record-item">Betting Odds: ${betData.betting_odds}</div>
            <div class="record-item">Game is still playing</div>
        `;
        container.appendChild(element);
      }
    });
  });

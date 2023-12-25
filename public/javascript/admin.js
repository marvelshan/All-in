fetch('/admin/payment', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then((betData) => {
    if (betData.success === false) {
      return alert(betData.message);
    }
    const game = [];
    const awayData = [];
    const homeData = [];
    betData.forEach((data, i) => {
      if (i % 2 === 0) {
        game.push(`${betData[i].home_team_id} v.s ${betData[i].away_team_id}`);
        awayData.push(betData[i].sum);
      } else if (i % 2 === 1) {
        homeData.push(betData[i].sum);
      }
    });
    const data = {
      labels: game,
      datasets: [
        {
          label: 'home',
          data: homeData,
          backgroundColor: 'rgba(220, 220, 100, 0.5)',
        },
        {
          label: 'away',
          data: awayData,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Total Payouts for Each Team',
          font: {
            size: 16,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Teams',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total Payout (Amount * Odds)',
          },
        },
      },
    };
    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data,
      options,
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

fetch('/admin/number', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then((betData) => {
    if (betData.success === false) {
      return alert(betData.message);
    }
    betData.forEach((element, i) => {
      if (i % 2 === 0) {
        let data = [betData[i].count, betData[i + 1].count];
        let label = element.GAME_ID;
        let away = betData[i].away_team_id;
        let home = betData[i].home_team_id;
        createPie(label, data, away, home);
      }
    });
  });
function updateBarChart(betData) {
  const game = [];
  const awayData = [];
  const homeData = [];
  betData.forEach((data, i) => {
    if (i % 2 === 0) {
      game.push(`${betData[i].home_team_id} v.s ${betData[i].away_team_id}`);
      awayData.push(betData[i].sum);
    } else if (i % 2 === 1) {
      homeData.push(betData[i].sum);
    }
  });
  const data = {
    labels: game,
    datasets: [
      {
        label: 'home',
        data: homeData,
        backgroundColor: 'rgba(220, 220, 100, 0.5)',
      },
      {
        label: 'away',
        data: awayData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  window.myChart.data = data;
  window.myChart.update();
}

const pieFrame = document.querySelector('.pieFrame');
function createPie(label, data, away, home) {
  const pie = document.createElement('canvas');
  pie.className = 'pie';
  pieFrame.appendChild(pie);
  const pieChart = pie.getContext('2d');
  return new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: [`${away} Bets on Away Team`, `${home} Bets on Home Team`],
      datasets: [
        {
          label,
          data,
          backgroundColor: ['rgb(220, 120, 100)', 'rgb(0, 201, 154)'],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: label,
          font: {
            size: 16,
          },
        },
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            const label = data.labels[tooltipItem.index];
            const value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return `${label}: ${value} bets`;
          },
        },
      },
    },
  });
}

function scheduleGame(id, time) {
  fetch('/game/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      time,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        return alert(data.message);
      } else if (data.success === true) {
        return alert(data.message);
      }
    });
}

const buttonContainer = document.getElementById('buttonContainer');
const schedule = document.querySelector('.schedule');

function closeSchedule() {
  const title = document.querySelector('.gameTitle');
  const id = document.querySelector('.gameid');
  schedule.removeChild(title);
  schedule.removeChild(id);
  schedule.style.display = 'none';
}

function dateTimeToCron(date, time) {
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return `${minutes} ${hours} ${day} ${month} *`;
}

function submitSchedule() {
  const title = document.querySelector('.gameTitle');
  const timeInput = document.getElementById('appt').value;
  const dateInput = document.getElementById('start').value;
  const id = document.querySelector('.gameid');
  if (timeInput === '') {
    alert('time can not be empty');
    return;
  }
  const time = dateTimeToCron(dateInput, timeInput);
  scheduleGame(id.textContent, time);
  schedule.style.display = 'none';
  schedule.removeChild(title);
  schedule.removeChild(id);
}
const futureGameFrame = document.querySelector('.futureGameFrame');
const scheduleContainer = document.querySelector('.scheduleContainer');
const barChart = document.querySelector('.barChart');
function showBarChart() {
  barChart.style.display = 'flex';
  scheduleContainer.style.display = 'none';
  pieFrame.style.display = 'none';
  futureGameFrame.style.display = 'none';
}
function showPieChart() {
  pieFrame.style.display = 'flex';
  barChart.style.display = 'none';
  scheduleContainer.style.display = 'none';
  futureGameFrame.style.display = 'none';
}
function startGameSystem() {
  pieFrame.style.display = 'none';
  barChart.style.display = 'none';
  scheduleContainer.style.display = 'block';
  futureGameFrame.style.display = 'none';
}
function showScheduledGame() {
  pieFrame.style.display = 'none';
  barChart.style.display = 'none';
  scheduleContainer.style.display = 'none';
  futureGameFrame.style.display = 'block';
}
function cronToDateTime(cronExpression) {
  const cronParts = cronExpression.split(' ');
  const [minutes, hours, day, month] = cronParts;
  const date = `2023/${month}/${day} ${hours}:${minutes}`;
  return { date };
}
function closeFutureGameFrame() {
  const futureGameFrame = document.querySelector('.futureGameFrame');
  futureGameFrame.style.display = 'none';
}

fetch('/game/infor', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then(async (data) => {
    const pendingContainer = document.createElement('div');
    const playingContainer = document.createElement('div');
    const waitingContainer = document.createElement('div');
    const pendingTitle = document.createElement('div');
    const playingTitle = document.createElement('div');
    const waitingTitle = document.createElement('div');
    const pendingFrame = document.createElement('div');
    const playingFrame = document.createElement('div');
    const waitingFrame = document.createElement('div');
    pendingTitle.className = 'setGameSubTitle';
    playingTitle.className = 'setGameSubTitle';
    waitingTitle.className = 'setGameSubTitle';
    pendingFrame.className = 'setGameSubFrame';
    playingFrame.className = 'setGameSubFrame';
    waitingFrame.className = 'setGameSubFrame';
    pendingTitle.textContent = 'Scheduled Game';
    playingTitle.textContent = 'Ongoing Game';
    waitingTitle.textContent = 'Not scheduled game';
    await data.forEach((game, i) => {
      const button = document.createElement('button');
      const homeFrame = document.createElement('div');
      const awayFrame = document.createElement('div');
      const homeImage = document.createElement('div');
      const awayImage = document.createElement('div');
      const perHomeGame = document.createElement('div');
      const perAwayGame = document.createElement('div');
      const vs = document.createElement('div');
      button.className = 'startGameButton';
      homeImage.className = 'homeImage';
      awayImage.className = 'awayImage';
      homeFrame.className = 'homeFrame';
      awayFrame.className = 'awayFrame';
      perHomeGame.className = 'perHomeGame';
      perAwayGame.className = 'perAwayGame';
      pendingContainer.className = 'pendingContainer';
      playingContainer.className = 'playingContainer';
      waitingContainer.className = 'waitingContainer';
      vs.textContent = 'v.s';
      perAwayGame.textContent = game.away_team_id;
      perHomeGame.textContent = game.home_team_id;
      homeImage.style.backgroundImage = `url(https://d3qptsb2ee7s4x.cloudfront.net/image/${game.home_team_id}.png)`;
      awayImage.style.backgroundImage = `url(https://d3qptsb2ee7s4x.cloudfront.net/image/${game.away_team_id}.png)`;
      homeFrame.appendChild(homeImage);
      awayFrame.appendChild(awayImage);
      homeFrame.appendChild(perHomeGame);
      awayFrame.appendChild(perAwayGame);
      button.appendChild(homeFrame);
      button.appendChild(vs);
      button.appendChild(awayFrame);
      if (game.status === 'pending') {
        pendingContainer.appendChild(button);
      } else if (game.status === 'playing') {
        playingContainer.appendChild(button);
      } else if (game.status === 'waiting') {
        waitingContainer.appendChild(button);
      }
      button.onclick = function () {
        schedule.style.display = 'block';
        const title = document.createElement('div');
        const id = document.createElement('div');
        title.className = 'gameTitle';
        id.className = 'gameid';
        title.textContent = `${game.away_team_id} v.s ${game.home_team_id}`;
        id.textContent = game.GAME_ID;
        schedule.appendChild(title);
        schedule.appendChild(id);
      };
      if (game.status === 'pending') {
        const time = game.time;
        const scheduleTime = document.createElement('div');
        const futureHomeFrame = document.createElement('div');
        const futureHomeImage = document.createElement('div');
        const futureHome = document.createElement('div');
        const futureAwayFrame = document.createElement('div');
        const futureAwayImage = document.createElement('div');
        const futureAway = document.createElement('div');
        const futureOdds = document.createElement('div');
        const url = document.createElement('a');
        const futurGamePerFrame = document.createElement('div');
        const futureGameFrame = document.querySelector('.futureGameFrame');
        scheduleTime.className = 'scheduleTime';
        futureHomeFrame.className = 'futureHomeFrame';
        futureHomeImage.className = 'futureHomeImage';
        futureAwayFrame.className = 'futureHomeFrame';
        futureAwayImage.className = 'futureAwayImage';
        futureHome.className = 'futurePerGame';
        futureAway.className = 'futurePerGame';
        futureOdds.className = 'futureOdds';
        futurGamePerFrame.className = 'futurGamePerFrame';
        futureHome.textContent = game.home_team_id;
        futureAway.textContent = game.away_team_id;
        futureHomeImage.style.backgroundImage = `url(https://d3qptsb2ee7s4x.cloudfront.net/image/${game.home_team_id}.png)`;
        futureAwayImage.style.backgroundImage = `url(https://d3qptsb2ee7s4x.cloudfront.net/image/${game.away_team_id}.png)`;
        scheduleTime.textContent = time;
        url.href = `/game?game=${game.GAME_ID}`;
        futurGamePerFrame.appendChild(scheduleTime);
        futureHomeFrame.appendChild(futureHomeImage);
        futureHomeFrame.appendChild(futureHome);
        futureAwayFrame.appendChild(futureAwayImage);
        futureAwayFrame.appendChild(futureAway);
        futurGamePerFrame.appendChild(futureHomeFrame);
        futurGamePerFrame.appendChild(futureAwayFrame);
        futurGamePerFrame.appendChild(futureOdds);
        url.appendChild(futurGamePerFrame);
        futureGameFrame.appendChild(url);
      }
    });
    pendingFrame.appendChild(pendingTitle);
    pendingFrame.appendChild(pendingContainer);
    playingFrame.appendChild(playingTitle);
    playingFrame.appendChild(playingContainer);
    waitingFrame.appendChild(waitingTitle);
    waitingFrame.appendChild(waitingContainer);
    buttonContainer.appendChild(playingFrame);
    buttonContainer.appendChild(pendingFrame);
    buttonContainer.appendChild(waitingFrame);
  });

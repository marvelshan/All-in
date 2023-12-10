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
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'away',
          data: awayData,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data,
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

const pieFrame = document.querySelector('.pieFrame');
function createPie(label, data, away, home) {
  const pie = document.createElement('canvas');
  pie.className = 'pie';
  pieFrame.appendChild(pie);
  const pieChart = pie.getContext('2d');
  return new Chart(pieChart, {
    type: 'pie',
    data: {
      labels: [away, home],
      datasets: [
        {
          label,
          data,
          backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
        },
      ],
    },
  });
}

function scheduleGame(id, time, notifyTime) {
  fetch('/game/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      time,
      notifyTime,
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
fetch('/game/infor', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((game, i) => {
      const button = document.createElement('button');
      button.className = 'button';
      buttonContainer.appendChild(button);
      button.textContent = `${game.away_team_id} v.s ${game.home_team_id}`;
      button.onclick = function () {
        schedule.style.display = 'block';
        const title = document.createElement('div');
        const id = document.createElement('div');
        title.className = 'title';
        id.className = 'gameid';
        title.textContent = `${game.away_team_id} v.s ${game.home_team_id}`;
        id.textContent = 22200001 + i;
        schedule.appendChild(title);
        schedule.appendChild(id);
      };
    });
  });

function closeSchedule() {
  const title = document.querySelector('.title');
  schedule.style.display = 'none';
  schedule.removeChild(title);
}

function dateTimeToCron(date, time) {
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return `${minutes} ${hours} ${day} ${month} *`;
}

function submitSchedule() {
  const title = document.querySelector('.title');
  const timeInput = document.getElementById('appt').value;
  const dateInput = document.getElementById('start').value;
  const id = document.querySelector('.gameid').textContent;
  const time = dateTimeToCron(dateInput, timeInput);
  const notifyTime = dateTimeToCron(dateInput, timeInput);
  scheduleGame(id, time, notifyTime);
  schedule.style.display = 'none';
  schedule.removeChild(title);
}

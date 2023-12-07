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

// function createBar(ctx, label, data) {
//   const ctx = document.getElementById('myChart').getContext('2d');
//   window.myChart = new Chart(ctx, {
//     type: 'bar',
//     data,
//   });
// }

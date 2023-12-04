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
    const gameIds = [];
    betData.forEach((entry) => {
      if (!gameIds.includes(entry.GAME_ID)) {
        gameIds.push(entry.GAME_ID);
      }
    });
    const data = {
      labels: gameIds,
      datasets: [
        {
          label: 'home',
          data: [
            betData[1].sum,
            betData[3].sum,
            betData[5].sum,
            betData[7].sum,
            betData[9].sum,
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'away',
          data: [
            betData[0].sum,
            betData[2].sum,
            betData[4].sum,
            betData[6].sum,
            betData[8].sum,
          ],
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
    console.log(betData);
    const pChart1 = document.getElementById('pieChart1').getContext('2d');
    const pChart2 = document.getElementById('pieChart2').getContext('2d');
    const pChart3 = document.getElementById('pieChart3').getContext('2d');
    const pChart4 = document.getElementById('pieChart4').getContext('2d');
    const pChart5 = document.getElementById('pieChart5').getContext('2d');
    window.myChart = new Chart(pChart1, {
      type: 'pie',
      data: {
        labels: ['away', 'home'],
        datasets: [
          {
            label: '22200001',
            data: [betData[0].count, betData[1].count],
            backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
          },
        ],
      },
    });
    window.myChart = new Chart(pChart2, {
      type: 'pie',
      data: {
        labels: ['away', 'home'],
        datasets: [
          {
            label: '22200002',
            data: [betData[2].count, betData[3].count],
            backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
          },
        ],
      },
    });
    window.myChart = new Chart(pChart3, {
      type: 'pie',
      data: {
        labels: ['away', 'home'],
        datasets: [
          {
            label: '22200003',
            data: [betData[4].count, betData[5].count],
            backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
          },
        ],
      },
    });
    window.myChart = new Chart(pChart4, {
      type: 'pie',
      data: {
        labels: ['away', 'home'],
        datasets: [
          {
            label: '22200004',
            data: [betData[6].count, betData[7].count],
            backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
          },
        ],
      },
    });
    window.myChart = new Chart(pChart5, {
      type: 'pie',
      data: {
        labels: ['away', 'home'],
        datasets: [
          {
            label: '22200005',
            data: [betData[8].count, betData[9].count],
            backgroundColor: ['rgb(96, 223, 81)', 'rgb(0, 201, 154)'],
          },
        ],
      },
    });
  });

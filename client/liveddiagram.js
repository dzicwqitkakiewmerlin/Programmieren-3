document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementsByClassName('lived')[0];
  if (canvas) {
    const data = {
      labels: [
        'DeathGrass',
        'Grass',
        'GrassEater',
        'Pups',
        'MeatEater',
        'MobSpawner'
      ],
      datasets: [{
        data: [0, 0, 0, 0, 0, 0], // Initial values for each label
        backgroundColor: [
          'rgb(0,0,0)',
          'rgb(0,255,0)',
          'rgb(255,255,0)',
          'rgb(128,255,0)',
          'rgb(255,0,0)',
          'rgb(128,125,125)'
        ],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false
      }
    };

    const myChart = new Chart(canvas, config);

    function updateData(chart, newData) {
      chart.data.datasets[0].data = newData; // Update the dataset with new data
      chart.update();
    }

    function changeColor(colors) {
      let doughnutcolor = [colors[0], colors[1],'rgb(255,255,0)', 'rgb(128,255,0)', 'rgb(255,0,0)', colors[2]];
      myChart.data.datasets[0].backgroundColor = doughnutcolor; 
      myChart.update(); 
    }

    socket.on('data', (data) => {
      updateData(myChart, data);
    });
    socket.on('colors', (colors) => {
      changeColor(colors)
    });

  } else {
    console.error('Canvas element not found');
  }
});


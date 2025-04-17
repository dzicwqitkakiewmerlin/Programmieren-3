document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementsByClassName('living');
    if (canvas) {
      const data = {
        datasets: [
          {
          label: 'DeathGrass',
        },
        {
          label: 'Grass',
        },
        {
          label: 'GrassEater',
          backgroundColor: 'rgb(255,255,0)',
          borderColor: 'rgb(255,255,0)'
        },
        {
          label: 'Pups',
          backgroundColor: 'rgb(128,255,0)',
          borderColor: 'rgb(128,255,0)'
        },
        {
          label: 'MeatEater',
          backgroundColor: 'rgb(255,0,0)',
          borderColor: 'rgb(255,0,0)'
        },
        {
          label: 'MobSpawner',
        }
      ]
      };
  
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            y: {
              beginAtZero: true, // Auto-adjust based on data
              //type: 'logarithmic',
            }
          }
        }
      };
  
  
      const myChart = new Chart(
        canvas,
        config
      );
  
      // function to update the chart 
      function addData(chart, label, data, maxWerte=100) {
        chart.data.labels.push(label);
        if(chart.data.labels.length >= maxWerte){
          chart.data.labels.shift()
        }
        chart.data.datasets.forEach((dataset, idx) => {
          dataset.data.push(data[idx]);
          if(dataset.data.length >= maxWerte){
            dataset.data.shift()
          }
        });
        chart.update();
      }
      function changeColor(colors) {
        myChart.data.datasets[0].backgroundColor = colors[0];
        myChart.data.datasets[0].borderColor = colors[0];
        myChart.data.datasets[1].backgroundColor = colors[1];
        myChart.data.datasets[1].borderColor = colors[1];
        myChart.data.datasets[5].backgroundColor = colors[2];
        myChart.data.datasets[5].borderColor = colors[2];
        myChart.update(); 
      }
  
      let time = 0
      socket.on('livingdata', (livingData) => {
       time = (new Date()).toLocaleTimeString()
        // console.log("data received", livingData)
        addData(myChart, time, livingData);
      })
      socket.on('colors', (colors) => {
        changeColor(colors)
      });
  
    } else {
      console.error('Canvas element not found');
    }
  });
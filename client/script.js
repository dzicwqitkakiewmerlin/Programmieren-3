
// Socket.io: Verbindung zum Server herstellen

// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 10;

// setup Funktion von p5.js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
  // Die Matrix wird auf den Bildschirm gezeichnet.
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fill(matrix[i][j].color);
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementsByClassName('lived');
  if (canvas) {
    const data = {
      datasets: [
        {
        label: 'DeathGrass',
        backgroundColor: 'rgb(0,0,0)',
        borderColor: 'rgb(0,0,0)',
      },
      {
        label: 'Grass',
        backgroundColor: 'rgb(0,255,0)',
        borderColor: 'rgb(0,255,0)'
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
        backgroundColor: 'rgb(128,125,125)', 
        borderColor: 'rgb(128,125,125)'
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
            type: 'logarithmic',
          }
        }
      }
    };


    const myChart = new Chart(
      canvas,
      config
    );

    // function to update the chart 
    function addData(chart, label, data, maxWerte=300) {
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

    let time = 0
    socket.on('data', (data) => {
     time = (new Date()).toLocaleTimeString()
      console.log("data received", data)
      addData(myChart, time, data);
    })


  } else {
    console.error('Canvas element not found');
  }
});

document.addEventListener('DOMContentLoaded', function () {
const button = document.getElementById('godmode');
button.addEventListener('click', godmode);
function godmode() {
  socket.emit('godmode', {});
}
});

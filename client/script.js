
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
      datasets: [{
        label: 'Test',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      }]
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
            beginAtZero: false, // Auto-adjust based on data
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
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
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
      addData(myChart, time, data[0]);
    })


  } else {
    console.error('Canvas element not found');
  }

  function godmode() {
    let cols = Math.floor(matrix / 2);
    let rows = Math.floor(matrix / 2);

    // Initialisiere das Array mit Nullen
    for (let y = 0; y < rows; y++) {
      matrix[y] = [];
      for (let x = 0; x < cols; x++) {
        matrix[y][x] = 0;
      }
    }
  }
});


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

// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {
socket.on('data', (data) => {
            //console.log(data);
    // Hier können wir die Daten verarbeiten und anzeigen
});

const canvas = document.getElementById('myChart');
if (canvas) {
    const labels = [
        'dju32',
        'ad6b2',
        '0f23f',
        'asd4c',
      ];
      
      const data = {
        labels: labels,
        datasets: [{
          label: 'Test',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 4],
        }]
      };
      
      const config = {
        type: 'line',
        data: data,
        options: {}
      };
      
      const myChart = new Chart(
        canvas,
        config
      );
      
      // function to update the chart 
      function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
        });
        chart.update();
      }
      
      // randomly add new data
      setInterval(function() {
        const newLabel = (Math.random() + 1).toString(36).substring(7);
        const newData = Math.floor(Math.random() * 10);
        addData(myChart, newLabel, newData);
      }, 1000);
      
      
} else {
  console.error('Canvas element not found');
}

function godmode() {
    let cols = Math.floor(cols / 2);
    let rows = Math.floor(rows / 2);
  
    // Initialisiere das Array mit Nullen
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = 0;
      }
    }
};

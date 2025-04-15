
// Socket.io: Verbindung zum Server herstellen

// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 10;

// setup Funktion von p5.js
function setup() {
  createCanvas(windowWidth, cellSize * 50);
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

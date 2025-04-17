// importiere alle benötigen Funktionen, variablen und Klassesn

// je nach Ordnerstruktur, sehen diese Imports unterschiedlich aus
import { setup, draw, matrix } from './simulation/utils.js';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { getCounter } from './simulation/data.js';
import { Empty } from './simulation/creatures/Empty.js';
import { resetData } from './simulation/data.js';
import { nowlivingcreatures } from './simulation/livingdata.js';
import { resetlivingdata } from './simulation/livingdata.js';
import { matrixSize } from './simulation/utils.js';
import { Grass } from './simulation/creatures/Grass.js';
import { MeatEater } from './simulation/creatures/MeatEater.js';
import { GrassEater } from './simulation/creatures/GrassEater.js';
import { nowmonth, season, setseason } from './simulation/season.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let intertval;

// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('../client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    nowmonth();
});

// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        resetData();
        resetlivingdata();
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(intertval);

    });

    let counter = 0
    setup();
    intertval = setInterval(() => {
        draw();
        socket.emit('matrix', getTransformedMatrix());
        if (counter % 2 == 0) socket.emit('data', data());
        if (counter % 2 == 0) socket.emit('livingdata', nowlivingcreatures());
        resetlivingdata();
        counter++
    }, 40);

    socket.on('godmode', () => {
        for(let j = 0; j < matrix.length; j++){
            for(let i = 0; i < matrix[j].length; i++){
                matrix[j][i] = new Empty;
            }
        }
        resetData();
        counter = 0;
        for(let j = 0; j < matrix.length; j++){
            for(let i = 0; i < matrix[j].length; i++){
                if(counter%1.5 == 0){
                    matrix[j][i] = new Grass;
                }
                counter++;
            }
        }
        matrix[matrixSize/2][matrixSize/2] = new GrassEater;
    });
    socket.on('winter', () => {
        setseason(0);
    });
    socket.on('spring', () => {
        setseason(1);
    });
    socket.on('summer', () => {
        setseason(2);
    });
    socket.on('autumn', () => {
        setseason(3);
    });
});

function getTransformedMatrix() {
    return matrix
}

function data() {
    return getCounter();
}



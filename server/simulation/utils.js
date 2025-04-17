import { Grass } from "./creatures/Grass.js";
import { GrassEaterPups } from "./creatures/GrassEaterPups.js";
import { GrassEater } from "./creatures/GrassEater.js";
import { MeatEater } from "./creatures/MeatEater.js";
import { MobSpawner } from "./creatures/MobSpawner.js";
import { Empty } from "./creatures/Empty.js";
import { season } from "./season.js";
// list of lists. Contains all creatures.
export let matrix = [];
// size of the matrix, how many cells in width and height
export let matrixSize = 50;

// setup the canvas and fill the matrix with creatures
// Will be called once at the start
export function setup() {
    fillRandomMatrix();
}

export function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}

// What probability each creature has to be created
let creaturePropabilities = [
    [Grass, 0.1],
    [GrassEater, 0.01],
    [MeatEater, 0.02],
    [MobSpawner, 0.03]
];

// Choose a random creature based on the probabilities
function getRandomCreature() {
    let rand = random();
    let sum = 0;
    for (let i = 0; i < creaturePropabilities.length; i++) {
        let creatureCLass = creaturePropabilities[i][0];
        let propability = creaturePropabilities[i][1];
        sum += propability;
        if (rand < sum) {
            return new creatureCLass();
        }
    }
    return new Empty();
}

// randomly fill the matrix with creatures based on the probabilities
function fillRandomMatrix() {
    for (let row = 0; row < matrixSize; row++) {
        matrix.push([]);
        for (let col = 0; col < matrixSize; col++) {
            matrix[row][col] = getRandomCreature();
        }
    }
}

// update the position of a creature in the matrix
// Creates a new empty object in the old position
export function updateCreaturePosition(creature, newPos) {
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

// game loop. This will be called every frame
// It will draw the matrix and update the creatures
export function draw() {
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix[zeile].length; spalte++) {
            let element = matrix[zeile][spalte]
            element.row = zeile
            element.col = spalte
            //console.log(matrix[zeile][spalte])
            if (typeof element.step === "function") {
                element.step();
                if (element.count !== "undefined" && element.counted === false) {
                    element.count();
                    element.counted = true;
                } if (season == 2) {
                    if (typeof element.burn === "function") {
                        element.burn()
                    }
                }
            } else {
                console.warn(`Element at (${element}) does not have a step method.`);
            }
            if (element.id !== "undefined") {
                // // console.log(element.id);
                // if(element.id == "Grass"){
                //     process.stdout.write("\x1b[38;2;0;255;0mG\x1b[0m")
                // }
                // else if(element.id == "MeatEater"){
                //     process.stdout.write("\x1b[38;2;255;0;0mM\x1b[0m")
                // }
                // else if(element.id == "GrassEater"){
                //     process.stdout.write("\x1b[38;2;255;255;0mY\x1b[0m")
                // }
                // else if(element.id == "MobSpawner"){
                //     process.stdout.write("\x1b[38;2;128;125;125mM\x1b[0m")
                // }
                // else if(element.id == "deathGrass"){
                //     process.stdout.write("\x1b[38;2;0;0;0mD\x1b[0m")
                // }
                // else if(element.id == "Empty"){
                //     process.stdout.write("\x1b[38;2;255;255;255mE\x1b[0m")
                // }
                // else if(element.id == "GrassEaterPups"){
                //     process.stdout.write("\x1b[38;2;128;255;0mP\x1b[0m")  
                // }
            } else {
                console.warn(`Element at (${element}) does not have a valid color.`);
                process.stdout.write(" "); // Default to a blank space
            }

        }
        // Wenn der erste Durchlauf von der Äußerden Schleife (Zeile) fertig
        // ist, wollen wir eine neue Zeile auf der Konsole anfangen
        // process.stdout.write("\n")
    }

    // optional, aber sehr praktisch:
    // wir können den Curser auf der Konsole nach oben bewegen,
    // sodass beim nächsten ausführen der Schleife, die alte Ausgabe
    // überschrieben wird. Das sorgt dafür, dass wir nicht unendlich
    // viele Zeilen auf der Konsole bekommen.
    // process.stdout.write("\u001b[" + matrix.length + "A")

    // console.log("is running")
    // for (let row = 0; row < matrixSize; row++) {
    //     for (let col = 0; col < matrixSize; col++) {
    //         let obj = matrix[row][col];

    //         // skip empty cells
    //         if (obj instanceof Empty) continue;

    //         // set the row and col of the creature
    //         obj.row = row;
    //         obj.col = col;


    //         // this prevents newly created creatures from being updated in the same step
    //         // and creatures that move from being updated multiple times in one frame
    //         if (obj.stepCount === frameCount) {
    //             obj.step();
    //             obj.stepCount++;
    //         }
    //         // draw the creature
    //         let thisBlock = obj.blockSize
    //     }
    // }
}







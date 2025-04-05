import { Grass } from "./creatures/Grass.js";
import { GrassEater } from "./creatures/GrassEater.js";
import { MeatEater } from "./creatures/MeatEater.js";
import { MobSpawner } from "./creatures/MobSpawner.js";

// list of lists. Contains all creatures.
let matrix = [];
// size of the matrix, how many cells in width and height
let matrixSize = 200;
// display size in pixels of each cell
let blockSize = 5;

// setup the canvas and fill the matrix with creatures
// Will be called once at the start
export function setup() {
    fillRandomMatrix();
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
function updateCreaturePosition(creature, newPos) {
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
    console.log("is running")
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



// list of lists. Contains all creatures.
let matrix = [];
// size of the matrix, how many cells in width and height
let matrixSize = 200;
// display size in pixels of each cell
let blockSize = 5;

// setup the canvas and fill the matrix with creatures
// Will be called once at the start
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize);
    fillRandomMatrix();
    noStroke();
    frameRate(10)
}

// Grass starts with a random energy between 0 and 2.
// It gains 1 energy every frame.
// When it reaches 7 energy, it creates a new grass object
// in an empty neighbour cell and resets its energy to 0.
class Grass {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "green";
        this.energy = int(random(0, 3));
        this.blockSize = 5
    }

    step() {
        this.energy++;
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

class Empty { constructor() { this.color = "white"; this.blockSize = 5} }
class GrassEater {
    constructor() {
        this.color = "yellow"
        this.stepCount = frameCount + 1;
        this.live = 0
        this.eaten = 0
        this.blockSize = 5
    }
    step() {
        this.move();
        
        if (this.live >= 10) {
            this.death()
        }
        if (this.eaten >= 5) {
            this.multiply()
        }if(this.eaten >= 25){
            matrix[this.row][this.col] = new MobSpawner()
        }
        this.live++;
    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Grass)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours)
            updateCreaturePosition(this, randomNeighbour)
            this.eaten++;
        }
        let neighbours_e = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours_e.length > 0) {
            let randomNeighbour = random(neighbours_e)
            updateCreaturePosition(this, randomNeighbour)
            this.eaten += 2;
        }
    }
    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new getRandomCreature2();
        }

    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }
    
}
class MeatEater {
    constructor() {
        this.color = "red"
        this.stepCount = frameCount + 1
        this.live = 0
        this.blockSize = 5
        this.eaten = 0
        
    }
    step() {
        this.eat()
        this.move()
        this.ersticken()
        if (this.live >= 10) {
            this.death()
        }if(this.eaten >= 6){
            this.multiply()
        }
        this.live++;
    }
    eat(){
        let eater_pos = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        let eater_pos1 = findNeighbourPositions(this.row, this.col, 1, deathGrass);
        if (eater_pos.length > 0) {
            let randomEmptyField = random(eater_pos);
            updateCreaturePosition(this, randomEmptyField)
            this.eaten++
        } else if (eater_pos1.length > 0) {
            let randomEmptyField = random(eater_pos1);
            updateCreaturePosition(this, randomEmptyField)
            this.eaten++;
            this.live  -= 2;

        }

    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours)
            updateCreaturePosition(this, randomNeighbour)
        }
    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }
    ersticken(){
        let isapups = findNeighbourPositions(this.row, this.col, 2, GrassEaterPups)
        if(isapups.length > 0){
            this.death()
        }
    }
    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, deathGrass);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new MeatEater();
        }
    }

    }

    class MobSpawner{
       constructor(){
           this.color = "grey"
           this.stepCount = frameCount + 1
           this.counter = 0
           this.blockSize = 5
       } 
       step(){
           this.counter++;
        
           if(this.counter >= 25){
               this.spawn()
               this.counter = 0
           }

       }
       spawn(){
        matrix[this.row][this.col] = new getRandomCreature1()
        
       }
       
    }


    class GrassEaterPups {
        constructor() {
            this.color = "#9CFF1D"
            this.stepCount = frameCount + 1;
            this.live = 0
            this.blockSize = 20
        }
        step() {
            this.move();
            this.ersticken()
            
            if (this.live >= 25) {
                this.death()
            }
            this.live++;
        }
        move() {
            let neighbours = findNeighbourPositions(this.row, this.col, 2, Grass)
            if (neighbours.length > 0) {
                let randomNeighbour = random(neighbours)
                updateCreaturePosition(this, randomNeighbour)
    
            }
            let neighbours_e = findNeighbourPositions(this.row, this.col, 2, Empty)
            if (neighbours_e.length > 0) {
                let randomNeighbour = random(neighbours_e)
                updateCreaturePosition(this, randomNeighbour)

            }
        }
        death() {
            matrix[this.row][this.col] = new Empty();
        }
        ersticken(){
            let grassd = findNeighbourPositions(this.row, this.col, 2, Grass)
            if(grassd.length > 0){
                matrix[this.row][this.col] = new deathGrass()
            }
        }
        
    }

    class deathGrass {
        constructor() {
            this.stepCount = frameCount + 1;
            this.color = "blue";
            this.energy = int(random(0, 3));
            this.blockSize = 5
        }
    
        step() {
            this.energy++;
            if (this.energy >= 14) {
                this.multiply();
                this.energy = 0;
            }
        }
    
        multiply() {
            let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
            if (emptyFields.length > 0) {
                let randomEmptyField = random(emptyFields);
                let row = randomEmptyField[0];
                let col = randomEmptyField[1];
                matrix[row][col] = new deathGrass();
            }
        }
    }

    // What probability each creature has to be created
let creaturePropabilities2 = [
    [GrassEater, 0.95],
    [GrassEaterPups, 0.05],
];

// Choose a random creature based on the probabilities
function getRandomCreature2() {
    let rand = random();
    let sum = 0;
    for (let i = 0; i < creaturePropabilities2.length; i++) {
        let creatureCLass = creaturePropabilities2[i][0];
        let propability = creaturePropabilities2[i][1];
        sum += propability;
        if (rand < sum) {
            return new creatureCLass();
        }
    }
    return new Empty();
}

// What probability each creature has to be created
let creaturePropabilities1 = [
    [GrassEater, 0.2],
    [MeatEater, 0.2],
    [MobSpawner, 0.5],
    [Grass, 0.1]
];

// Choose a random creature based on the probabilities
function getRandomCreature1() {
    let rand = random();
    let sum = 0;
    for (let i = 0; i < creaturePropabilities1.length; i++) {
        let creatureCLass = creaturePropabilities1[i][0];
        let propability = creaturePropabilities1[i][1];
        sum += propability;
        if (rand < sum) {
            return new creatureCLass();
        }
    }
    return new Empty();
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

function findNeighbourPositions(x, y, distance, creatureType) {
    let positions = []
    //Alle Koordintaten ermitteln und in der Matrix positions speichern
    for (let i = x - distance; i <= x + distance; i++) {
        for (let j = y - distance; j <= y + distance; j++) {
            //nicht sich selber
            if (x == i && y == j) {

            }//nicht außerhalb des Canavas
            else if (i < 0 || j < 0) {

            }//nicht größer als Canavas
            else if (i >= matrix.length || j >= matrix.length) {

            }
            //Koordinaten in der Mattrix speichern
            else if (matrix[i][j] instanceof creatureType) {
                positions.push([i, j])
            }
        }
    }
    return positions
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
function draw() {
    background(200)
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col];

            // skip empty cells
            if (obj instanceof Empty) continue;

            // set the row and col of the creature
            obj.row = row;
            obj.col = col;


            // this prevents newly created creatures from being updated in the same step
            // and creatures that move from being updated multiple times in one frame
            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            }
            // draw the creature
            let thisBlock = obj.blockSize
            fill(obj.color);
            rect(blockSize * obj.col, blockSize * obj.row, thisBlock, thisBlock);
        }
    }
}




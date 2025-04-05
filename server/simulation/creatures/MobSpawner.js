import { Grass } from "./Grass.js";
import { GrassEater } from "./GrassEater.js";
import { MeatEater } from "./MeatEater.js";
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
export class MobSpawner {
    constructor() {
        this.color = "grey"
        this.stepCount = frameCount + 1
        this.counter = 0
        this.blockSize = 5
    }
    step() {
        this.counter++;

        if (this.counter >= 25) {
            this.spawn()
            this.counter = 0
        }

    }
    spawn() {
        matrix[this.row][this.col] = new getRandomCreature1()

    }
}
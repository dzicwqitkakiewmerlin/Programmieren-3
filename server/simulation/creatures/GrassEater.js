import { findNeighbourPositions } from "../findNeighbourPosition.js";
import { LivingCreature } from "./LivingCreature.js";
import { GrassEaterPups } from "./GrassEaterPups.js";
import { Grass } from "./Grass.js";
import { Empty } from "./Empty.js";
import { matrix } from "../utils.js";
import { updateCreaturePosition } from "../utils.js";
import { random } from "../utils.js";


export class GrassEater extends LivingCreature {
    constructor() {
        super("yellow");
        this.live = 0
        this.eaten = 0

        // What probability each creature has to be created
        this.creaturePropabilities2 = [
            [GrassEater, 0.95],
            [GrassEaterPups, 0.05]
        ];

    }
    step() {
        this.move();

        if (this.live >= 10) {
            this.death()
        }
        if (this.eaten >= 5) {
            this.multiply(Grass, this.getRandomCreature2);
        } if (this.eaten >= 25) {
            matrix[this.row][this.col] = new MobSpawner();
        }
        this.live++;
    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Grass)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten++;
        }
        let neighbours_e = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours_e.length > 0) {
            let randomNeighbour = random(neighbours_e);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten += 2;
        }
    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }



    // Choose a random creature based on the probabilities
    getRandomCreature2() {
        let rand = random();
        let sum = 0;
        for (let i = 0; i < this.creaturePropabilities2.length; i++) {
            let creatureCLass = this.creaturePropabilities2[i][0];
            let propability = this.creaturePropabilities2[i][1];
            sum += propability;
            if (rand < sum) {
                return new creatureCLass();
            }
        }
        return new Empty();
    }

}

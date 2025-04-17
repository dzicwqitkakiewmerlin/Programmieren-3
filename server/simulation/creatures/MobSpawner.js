import { Grass } from "./Grass.js";
import { GrassEater } from "./GrassEater.js";
import { MeatEater } from "./MeatEater.js";
import { random } from "../utils.js";
import { matrix } from "../utils.js";
import { incrementCounter } from "../data.js";
import { season } from "../season.js";
export class MobSpawner {
    constructor() {
        this.id = "MobSpawner";
        this.counted = false;
        if(season == 1){
            this.color = "#f27afa"
        }else if(season == 3){
            this.color = "#fac67a"
        }else{
            this.color = "grey"
        }
        this.counter = 0
        this.blockSize = 5
        this.creaturePropabilities1 = [
            [GrassEater, 0.2],
            [MeatEater, 0.2],
            [MobSpawner, 0.5],
            [Grass, 0.1]
        ];
    }
    step() {
        this.counter++;

        if (this.counter >= 10) {
            this.spawn()
            this.counter = 0
        }

    }
    spawn() {
        matrix[this.row][this.col] = this.getRandomCreature1()

    }
    // Choose a random creature based on the probabilities
    getRandomCreature1() {
        let rand = random();
        let sum = 0;
        for (let i = 0; i < this.creaturePropabilities1.length; i++) {
            let creatureCLass = this.creaturePropabilities1[i][0];
            let propability = this.creaturePropabilities1[i][1];
            sum += propability;
            if (rand < sum) {
                return new creatureCLass();
            }
        }
        return new Empty();
    }
    count() {
        incrementCounter("MobSpawner")
    };
}
import { LivingCreature } from "./LivingCreature.js";
import { Empty } from "./Empty.js";
import { incrementCounter } from "../data.js";
import { random } from "../utils.js";
import { season } from "../season.js";
import { deathGrass } from "./deathGrass.js";
export class Grass extends LivingCreature {
    constructor() {
        super();
        this.id = "Grass";
        if(season == 0){
            this.color = "#dfdfdf"
        }else {
            this.color = "green"
        }
        this.energy = random(0, 3);
    }

    step() {
        this.energy++;
        if (this.energy >= 7) {
            this.multiply(Empty, Grass);
            this.energy = 0;
        }
    }
    count() {
        incrementCounter("Grass")
    }
    burn() {
        if(season == 2){
            if(random(0, 25) == 1){
                this.multiply(Empty, deathGrass);
            }
        }
    }
}
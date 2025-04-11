import { LivingCreature } from "./LivingCreature.js";
import { random } from "../utils.js";
import { Empty } from "./Empty.js";
import { incrementCounter } from "../data.js";
export class deathGrass extends LivingCreature {
    constructor() {
        super();
        this.color = "black";
        this.energy = random(0, 3);
    }

    step() {
        this.energy++;
        if (this.energy >= 14) {
            this.multiply(Empty, deathGrass);
            this.energy = 0;
        }
    }
    count() {
        incrementCounter("deathGrass")
    }
}
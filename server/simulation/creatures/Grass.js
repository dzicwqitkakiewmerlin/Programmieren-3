import { LivingCreature } from "./LivingCreature.js";
import { Empty } from "./Empty.js";
import { random } from "../utils.js";
export class Grass extends LivingCreature {
    constructor() {
        super("green");
        this.energy = random(0, 3);
    }

    step() {
        this.energy++;
        if (this.energy >= 7) {
            this.multiply(Empty, Grass);
            this.energy = 0;
        }
    }
}
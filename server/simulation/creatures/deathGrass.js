import { LivingCreature } from "./LivingCreature.js";
import { random } from "../utils.js";
export class deathGrass extends LivingCreature {
    constructor() {
        super("blue");
        this.energy = int(random(0, 3));
    }

    step() {
        this.energy++;
        if (this.energy >= 14) {
            this.multiply(Empty, deathGrass);
            this.energy = 0;
        }
    }
}
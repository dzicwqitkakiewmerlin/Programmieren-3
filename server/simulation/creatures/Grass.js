import { LivingCreature } from "./LivingCreature.js";
export class Grass extends LivingCreature {
    constructor() {
        super("green");
        this.energy = int(random(0, 3));
    }

    step() {
        this.energy++;
        if (this.energy >= 7) {
            this.multiply(Empty, Grass);
            this.energy = 0;
        }
    }
}
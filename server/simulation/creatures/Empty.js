import { incrementCounter } from "../data.js";
export class Empty {
    constructor() {
        this.color = "white";
        this.blockSize = 5;
    }
    step() {
        // Empty creatures do not do anything
    }
    count() {
        incrementCounter("Empty")
    }
}
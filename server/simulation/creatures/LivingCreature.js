import { findNeighbourPositions } from "../findNeighbourPosition.js";
import { random } from "../utils.js";
import { matrix } from "../utils.js";
export class LivingCreature {
    constructor(color) {
        this.color = color;
        this.blockSize = 5
    }
    multiply(search, creature) {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, search);
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = creature();
        }
    }
}
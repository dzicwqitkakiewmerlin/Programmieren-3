import { findNeighbourPositions } from "../findNeighbourPosition.js";
import { GrassEater } from "./GrassEater.js";
import { random } from "../utils.js";


export class GrassEaterPups extends GrassEater {
    constructor() {
        super("#9CFF1D");
        this.live = 0
        this.blockSize = 20
    }
    step() {
        this.move();
        this.ersticken()

        if (this.live >= 25) {
            this.death()
        }
        this.live++;
    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 2, Grass)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours)
            updateCreaturePosition(this, randomNeighbour)

        }
        let neighbours_e = findNeighbourPositions(this.row, this.col, 2, Empty)
        if (neighbours_e.length > 0) {
            let randomNeighbour = random(neighbours_e)
            updateCreaturePosition(this, randomNeighbour)

        }
    }
    ersticken() {
        let grassd = findNeighbourPositions(this.row, this.col, 2, Grass)
        if (grassd.length > 0) {
            matrix[this.row][this.col] = new deathGrass()
        }
    }
}
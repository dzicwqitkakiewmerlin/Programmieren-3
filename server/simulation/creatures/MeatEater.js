import { findNeighbourPositions } from "../findNeighbourPosition.js";
export class MeatEater extends LivingCreature {
    constructor() {
        super("red");
        this.live = 0
        this.eaten = 0
        
    }
    step() {
        this.eat()
        this.move()
        this.ersticken()
        if (this.live >= 10) {
            this.death()
        }if(this.eaten >= 6){
            this.multiply(deathGrass, MeatEater)
        }
        this.live++;
    }
    eat(){
        let eater_pos = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        let eater_pos1 = findNeighbourPositions(this.row, this.col, 1, deathGrass);
        if (eater_pos.length > 0) {
            let randomEmptyField = random(eater_pos);
            updateCreaturePosition(this, randomEmptyField)
            this.eaten++
        } else if (eater_pos1.length > 0) {
            let randomEmptyField = random(eater_pos1);
            updateCreaturePosition(this, randomEmptyField)
            this.eaten++;
            this.live  -= 2;

        }

    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours)
            updateCreaturePosition(this, randomNeighbour)
        }
    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }
    ersticken(){
        let isapups = findNeighbourPositions(this.row, this.col, 2, GrassEaterPups)
        if(isapups.length > 0){
            this.death()
        }
    }
}
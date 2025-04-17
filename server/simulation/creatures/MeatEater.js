import { findNeighbourPositions } from "../findNeighbourPosition.js";
import { LivingCreature } from "./LivingCreature.js";
import { GrassEater } from "./GrassEater.js";
import { deathGrass } from "./deathGrass.js";
import { Empty } from "./Empty.js";
import { GrassEaterPups } from "./GrassEaterPups.js";
import { matrix } from "../utils.js";
import { random } from "../utils.js";
import { updateCreaturePosition } from "../utils.js";
import { incrementCounter } from "../data.js";
import { getGender } from "../gender.js";
import { season } from "../season.js";

export class MeatEater extends LivingCreature {
    constructor() {
        super();
        this.id = "MeatEater";
        this.color = "red";
        this.live = 0;
        this.eaten = 0;
        this.counter = 0;
        this.gender = getGender();
        if(season == 3){
            this.sex = 3;
        }else{
            this.sex = 6;
        }
    }
    step() {
        this.eat()
        this.move()
        this.ersticken()
        if (this.live >= 10) {
            this.death()
        } if (this.eaten >= this.sex) {
            if(this.gender == "Male"){
                if(this.counter == 1){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }else if(this.gender == "Female"){
                if(this.counter == 2){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }else if(this.gender == "Non-binary"){
                if(this.counter == 3){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }else if(this.gender == "Genderqueer"){
                if(this.counter == 4){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }else if(this.gender == "Agender"){
                if(this.counter == 5){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }else if(this.gender == "Genderfluid"){
                if(this.counter == 6){
                    this.multiply(deathGrass, MeatEater);
                    this.counter = 0;
                }
            }
            this.counter++;
        }
        this.live++;
    }
    eat() {
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
            this.live -= 2;

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
    ersticken() {
        let isapups = findNeighbourPositions(this.row, this.col, 2, GrassEaterPups)
        if (isapups.length > 0) {
            this.death()
        }
    }
    count() {
        incrementCounter("MeatEater")
    };
}
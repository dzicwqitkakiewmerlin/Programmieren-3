import { findNeighbourPositions } from "../findNeighbourPosition.js";
import { LivingCreature } from "./LivingCreature.js";
import { GrassEaterPups } from "./GrassEaterPups.js";
import { Grass } from "./Grass.js";
import { Empty } from "./Empty.js";
import { matrix } from "../utils.js";
import { updateCreaturePosition } from "../utils.js";
import { random } from "../utils.js";
import { MobSpawner } from "./MobSpawner.js";
import { incrementCounter } from "../data.js";
import { getGender } from "../gender.js";
import { season } from "../season.js";
export class GrassEater extends LivingCreature {
    constructor() {
        super();
        this.id = "GrassEater";
        this.color = "yellow";
        this.live = 0
        this.eaten = 0
        this.gender = getGender();
        this.counter = 0;
        this.creaturePropabilities2 = [];
        if(season == 0){
            this.sex = 7;
        }else if(season == 1){
            this.sex = 3;
        }else{
            this.sex = 5;
        }
        // What probability each creature has to be created
        this.creaturePropabilities2 = [
            [GrassEater, 0.95],
            [GrassEaterPups, 0.05]
        ];

    }
    step() {
        this.move();
        if (this.live >= 10) {
            this.death()
        }
        if (this.eaten >= this.sex) {
            //politisch nicht korrekt aber musste mich entscheiden wegen der Aufgabe, somit egal. Die Reihenfolge ist entstanden durch den Vorschlag von VSCode in gender.js
            //sollte es zur Anklage kommen, dann ist es nicht meine Schuld, sondern die von VSCode
            if(this.gender == "Male"){
                if(this.counter == 1){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }else if(this.gender == "Female"){
                if(this.counter == 2){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }else if(this.gender == "Non-binary"){
                if(this.counter == 3){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }else if(this.gender == "Genderqueer"){
                if(this.counter == 4){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }else if(this.gender == "Agender"){
                if(this.counter == 5){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }else if(this.gender == "Genderfluid"){
                if(this.counter == 6){
                    this.multiply(Grass, this.getRandomCreature2());
                    this.counter = 0;
                }
            }
            this.counter++;
        } if (this.eaten >= 20) {
            matrix[this.row][this.col] = new MobSpawner();
        }
        this.live++;
    }
    move() {
        let neighbours = findNeighbourPositions(this.row, this.col, 1, Grass)
        if (neighbours.length > 0) {
            let randomNeighbour = random(neighbours);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten++;
        }
        let neighbours_e = findNeighbourPositions(this.row, this.col, 1, Empty)
        if (neighbours_e.length > 0) {
            let randomNeighbour = random(neighbours_e);
            updateCreaturePosition(this, randomNeighbour);
            this.eaten += 2;
        }
    }
    death() {
        matrix[this.row][this.col] = new Empty();
    }
    getRandomCreature2() {
        let rand = random();
        let sum = 0;
        for (let i = 0; i < this.creaturePropabilities2.length; i++) {
            let creatureCLass = this.creaturePropabilities2[i][0];
            let propability = this.creaturePropabilities2[i][1];
            sum += propability;
            if (rand < sum) {
                return creatureCLass;
            }
        }
        return Empty();
    }
    count() {
        incrementCounter("GrassEater")
    }
}

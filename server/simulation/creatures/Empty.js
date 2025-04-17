import { incrementCounter } from "../data.js";
import { season } from "../season.js";
export class Empty {
    constructor() {
        this.counted = false;
        this.season = season;
        this.id = "Empty";
        if(season == 0){
            this.color = "#a4e8ff"; // winter
        }else if(season == 1){
            this.color = "#baffe2"; // spring
        }else if(season == 2){
            this.color = "#deff80"; // summer   
        }else if(season == 3){
            this.color = "#ffda80"; // autumn
        }
        this.blockSize = 5;
    }
    step() {
        // Empty creatures do not do anything
    }
    count() {
        incrementCounter("Empty")
    }
}
import { matrix } from "./utils.js";

//save the creature count in the matrix
let counter_deathGrass = 0;
let counter_Grass = 0;
let counter_GrassEater = 0;
let counter_GrassEaterPups = 0;
let counter_MeatEater = 0;
let counter_MobSpawner = 0;

//read the matrix and count the creatures
export function living() {
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix[zeile].length; spalte++) {
            let element = matrix[zeile][spalte]
            if (element.color && typeof element.color[0] !== "undefined") {
                if(element.color == "green"){
                    counter_Grass++;
                }else if(element.color == "red"){
                    counter_MeatEater++;
                }else if(element.color == "yellow"){
                    counter_GrassEater++;
                }else if(element.color == "grey"){
                    counter_MobSpawner++;
                }else if(element.color == "black"){
                    counter_deathGrass++;
                }else if(element.color == "#9CFF1D"){
                    counter_GrassEaterPups++;
                }  
                }
        }
    }
};

//combine the data in array
function collectdata() {
    let livingData = [
        counter_deathGrass,
        counter_Grass,
        counter_GrassEater,
        counter_GrassEaterPups,
        counter_MeatEater,
        counter_MobSpawner
    ]
    return livingData
}

//reset the living data
export function resetlivingdata() {
    counter_deathGrass = 0;
    counter_Grass = 0;
    counter_GrassEater = 0; 
    counter_GrassEaterPups = 0;
    counter_MeatEater = 0;
    counter_MobSpawner = 0;
}

//final function to get the data
export function nowlivingcreatures() {
    living();
    collectdata();
    return collectdata();
}
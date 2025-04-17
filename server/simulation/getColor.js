import { matrix } from "./utils.js";
export function getColor() {
    let colors = []
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix[zeile].length; spalte++) {
            let element = matrix[zeile][spalte]
            if (element.id == "deathGrass") {
                colors[0] = element.color;
            } if (element.id == "Grass") {
                colors[1] = element.color;
            }if (element.id == "MobSpawner") {
                colors[2] = element.color;
            }
        };
    };
    return colors;
};